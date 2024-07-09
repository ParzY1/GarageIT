const express = require('express');
require('dotenv').config()
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function enablePiHole() {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?enable&auth=${process.env.KLUCZ}`);
        if (response.data === 'OK') {
            console.log('Pi-hole enabled successfully');
        } else {
            console.error('Failed to enable Pi-hole', response.data);
        }
    } catch (error) {
        console.error('Error enabling Pi-hole', error);
    }
}

async function disablePiHole(duration = 0) {
    try {
        const disableUrl = duration > 0
            ? `${process.env.SERWER}/admin/api.php?disable=300&auth=${process.env.KLUCZ}`
            : `${process.env.SERWER}/admin/api.php?disable&auth=${process.env.KLUCZ}`;
        const response = await axios.get(disableUrl);
        if (response.data === 'OK') {
            console.log(`Pi-hole disabled successfully for ${duration > 0 ? duration + ' seconds' : 'indefinitely'}`);
        } else {
            console.error('Failed to disable Pi-hole', response.data);
        }
    } catch (error) {
        console.error('Error disabling Pi-hole', error);
    }
}

async function addToBlacklist(domain) {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?list=black&add=${domain}&auth=${process.env.KLUCZ}`);
        if (response.data === 'OK') {
            return `Domain "${domain}" added to blacklist successfully`;
        } else {
            throw new Error('Failed to add domain to blacklist');
        }
    } catch (error) {
        throw new Error(`Error adding domain to blacklist: ${error.message}`);
    }
}

const addGroup = (id, name, description) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return reject(err);
      }
    });

    const query = `INSERT INTO "group" (id, name, description) VALUES (?, ?, ?)`;
    db.run(query, [id, name, description], function (err) {
      db.close();
      if (err) {
        return reject(err);
      }
      resolve({ success: true, message: 'Group added successfully', id: this.lastID });
    });
  });
};

const addClient = (id, ip) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return reject(err);
      }
    });

    const query = `INSERT INTO "client" (id, ip) VALUES (?, ?)`;
    db.run(query, [id, ip], function (err) {
      db.close();
      if (err) {
        return reject(err);
      }
      resolve({ success: true, message: 'Client added successfully', id: this.lastID });
    });
  });
};

const addClientToGroup = (client_id, group_id) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return reject(err);
      }
    });

    const query = `INSERT INTO client_by_group (client_id, group_id) VALUES (?, ?)`;
    db.run(query, [client_id, group_id], function (err) {
      db.close();
      if (err) {
        return reject(err);
      }
      resolve({ success: true, message: 'Client assigned to group successfully', id: this.lastID });
    });
  });
};

const removeClientFromGroup = (client_id, group_id) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return reject(err);
      }
    });

    const query = `DELETE FROM client_by_group WHERE client_id = ? AND group_id = ?`;
    db.run(query, [client_id, group_id], function (err) {
      db.close();
      if (err) {
        return reject(err);
      }
      resolve({ success: true, message: 'Client removed from group successfully' });
    });
  });
}

const addDomainToGroup = (domainlist_id, group_id) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `INSERT INTO domainlist_by_group (domainlist_id, group_id) VALUES (?, ?)`;
      db.run(query, [domainlist_id, group_id], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: 'Domain assigned to group successfully', id: this.lastID });
      });
  });
};

const removeDomainFromGroup = (domainlist_id, group_id) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `DELETE FROM domainlist_by_group WHERE domainlist_id = ? AND group_id = ?`;
      db.run(query, [domainlist_id, group_id], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: 'Domain removed from group successfully' });
      });
  });
};

app.get('/enable', async (req, res) => {
    try {
        const message = await enablePiHole();
        res.send(message);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/disable', async (req, res) => {
    const duration = req.query.duration ? parseInt(req.query.duration) : 0;
    try {
        const message = await disablePiHole(duration);
        res.send(message);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/blacklist', async (req, res) => {
    const { domain } = req.body;
    if (!domain) {
        return res.status(400).send('Domain is required');
    }
    try {
        const message = await addToBlacklist(domain);
        res.send(message);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/groups', async (req, res) => {
  const { id, name, description } = req.body;

  if (!id || !name || !description) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const result = await addGroup(id, name, description);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add group', error: error.message });
  }
});

app.post('/clients', async (req, res) => {
  const { id, ip } = req.body;

  if (!id || !ip) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const result = await addClient(id, ip);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add client', error: error.message });
  }
});

app.post('/group-assignment', async (req, res) => {
  const { client_id, group_id } = req.body;

  if (!client_id || !group_id) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const result = await addClientToGroup(client_id, group_id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to assign client to group', error: error.message });
  }
});

app.delete('/group-assignment/:client_id/:group_id', async (req, res) => {
  const { client_id, group_id } = req.params;

  if (!client_id || !group_id) {
      return res.status(400).json({ success: false, message: 'Client ID and Group ID are required' });
  }

  try {
      const result = await removeClientFromGroup(client_id, group_id);
      res.json(result);
  } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to remove client from group', error: error.message });
  }
});

app.post('/domain-group-assignment', async (req, res) => {
  const { domainlist_id, group_id } = req.body;

  if (!domainlist_id || !group_id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
      console.log(`Assigning domain ${domainlist_id} to group ${group_id}`); // Logging
      const result = await addDomainToGroup(domainlist_id, group_id);
      res.json(result);
  } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to assign domain to group', error: error.message });
  }
});

app.delete('/domain-group-assignment/:domainlist_id/:group_id', async (req, res) => {
  const { domainlist_id, group_id } = req.params;

  if (!domainlist_id || !group_id) {
      return res.status(400).json({ success: false, message: 'Domainlist ID and Group ID are required' });
  }

  try {
      console.log(`Removing domain ${domainlist_id} from group ${group_id}`); // Logging
      const result = await removeDomainFromGroup(domainlist_id, group_id);
      res.json(result);
  } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to remove domain from group', error: error.message });
  }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running properly.`);
});
