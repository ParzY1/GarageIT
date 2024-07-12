const express = require('express');
require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const axios = require('axios');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const auth = require('./middleware/auth');

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', userRoutes);

app.use(auth);

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
            ? `${process.env.SERWER}/admin/api.php?disable=${duration}&auth=${process.env.KLUCZ}`
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

async function addToWhitelist(domain) {
  try {
      const response = await axios.get(`${process.env.SERWER}/admin/api.php?list=white&add=${domain}&auth=${process.env.KLUCZ}`);
      if (response.data === 'OK') {
          return `Domain "${domain}" added to whitelist successfully`;
      } else {
          throw new Error('Failed to add domain to whitelist');
      }
  } catch (error) {
      throw new Error(`Error adding domain to whitelist: ${error.message}`);
  }
}

async function removeFromBlacklist(domain) {
  try {
      const response = await axios.get(`${process.env.SERWER}/admin/api.php?list=black&sub=${domain}&auth=${process.env.KLUCZ}`);
      if (response.data === 'OK') {
          return `Domain "${domain}" removed from blacklist successfully`;
      } else {
          throw new Error('Failed to remove domain from blacklist');
      }
  } catch (error) {
      throw new Error(`Error removing domain from blacklist: ${error.message}`);
  }
}

async function removeFromWhitelist(domain) {
  try {
      const response = await axios.get(`${process.env.SERWER}/admin/api.php?list=white&sub=${domain}&auth=${process.env.KLUCZ}`);
      if (response.data === 'OK') {
          return `Domain "${domain}" removed from whitelist successfully`;
      } else {
          throw new Error('Failed to remove domain from whitelist');
      }
  } catch (error) {
      throw new Error(`Error removing domain from whitelist: ${error.message}`);
  }
}

const enableDomain = (name) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `UPDATE domainlist SET enabled = 1 WHERE domain = ?`;
      db.run(query, [name], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: `Domain "${name}" enabled successfully` });
      });
  });
};

const disableDomain = (name) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `UPDATE domainlist SET enabled = 0 WHERE domain = ?`;
      db.run(query, [name], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: `Domain "${name}" disabled successfully` });
      });
  });
};

const addGroup = (name, description) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `INSERT INTO "group" (name, description) VALUES (?, ?)`;
      db.run(query, [name, description], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: 'Group added successfully', id: this.lastID });
      });
  });
};

const deleteGroup = (name) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `DELETE FROM "group" WHERE name = ?`;
      db.run(query, [name], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: `Group "${name}" deleted successfully` });
      });
  });
};

const addClient = (ip) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `INSERT INTO "client" (ip) VALUES (?)`;
      db.run(query, [ip], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: 'Client added successfully', id: this.lastID });
      });
  });
};

const removeClient = (ip) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `DELETE FROM client WHERE ip = ?`;
      db.run(query, [ip], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: `Client with IP ${ip} removed successfully` });
      });
  });
};

const addClientToGroup = (client_ip, group_name) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `INSERT INTO client_by_group (client_id, group_id) VALUES (
          (SELECT id FROM client WHERE ip = ?),
          (SELECT id FROM "group" WHERE name = ?)
      )`;
      db.run(query, [client_ip, group_name], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: 'Client assigned to group successfully', id: this.lastID });
      });
  });
};

const removeClientFromGroup = (client_ip, group_name) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `DELETE FROM client_by_group WHERE client_id = (SELECT id FROM client WHERE ip = ?) AND group_id = (SELECT id FROM "group" WHERE name = ?)`;
      db.run(query, [client_ip, group_name], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: 'Client removed from group successfully' });
      });
  });
}

const addDomainToGroup = (domain_name, group_name) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `INSERT INTO domainlist_by_group (domainlist_id, group_id) VALUES (
          (SELECT id FROM domainlist WHERE domain = ?),
          (SELECT id FROM "group" WHERE name = ?)
      )`;
      db.run(query, [domain_name, group_name], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: 'Domain assigned to group successfully', id: this.lastID });
      });
  });
};

const removeDomainFromGroup = (domain_name, group_name) => {
  return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              return reject(err);
          }
      });

      const query = `DELETE FROM domainlist_by_group WHERE domainlist_id = (SELECT id FROM domainlist WHERE domain = ?) AND group_id = (SELECT id FROM "group" WHERE name = ?)`;
      db.run(query, [domain_name, group_name], function (err) {
          db.close();
          if (err) {
              return reject(err);
          }
          resolve({ success: true, message: 'Domain removed from group successfully' });
      });
  });
};

const removeFromDomainList = (name) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return reject(err);
      }
    });

    const query = `DELETE FROM domainlist WHERE domain = ?`;
    db.run(query, [name], function (err) {
      db.close();
      if (err) {
        return reject(err);
      }
      resolve({ success: true, message: `Domain "${name}" removed successfully from domainlist` });
    });
  });
};


async function fetchSummaryStatistics() {
  try {
      const response = await axios.get(`${process.env.SERWER}/admin/api.php?summary&auth=${process.env.KLUCZ}`);
      if (response.status === 200 && response.data) {
          const data = response.data;
          console.log('Fetched data from Pi-hole API:', data);
          return {
              dnsQueriesToday: data.dns_queries_today,
              adsBlockedToday: data.ads_blocked_today,
              adsPercentageToday: data.ads_percentage_today,
              domainsBlocked: data.domains_being_blocked
          };
      } else {
          throw new Error('Failed to fetch data from Pi-hole API');
      }
  } catch (error) {
      throw new Error(`Error fetching summary statistics: ${error.message}`);
  }
}

//requires further diagnosis and testing due to lack of data
const filterQueriesFromLast24Hours = (queries) => {
  const last24Hours = Date.now() / 1000 - 24 * 60 * 60;
  return queries.filter(query => query[0] >= last24Hours);
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

app.get('/summary-statistics', async (req, res) => {
  try {
      const stats = await fetchSummaryStatistics();
      console.log('Summary statistics:', stats);
      res.json(stats);
  } catch (error) {
      console.error('Error in /summary-statistics route:', error);
      res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/blacklist/:domain', (req, res) => {
  const domain = req.params.domain;
  addToBlacklist(domain).then((result) => {
      res.json({ success: true, message: result });
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.delete('/blacklist/:domain', (req, res) => {
  const domain = req.params.domain;
  removeFromBlacklist(domain).then((result) => {
      res.json({ success: true, message: result });
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.post('/whitelist/:domain', (req, res) => {
  const domain = req.params.domain;
  addToWhitelist(domain).then((result) => {
      res.json({ success: true, message: result });
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.delete('/whitelist/:domain', (req, res) => {
  const domain = req.params.domain;
  removeFromWhitelist(domain).then((result) => {
      res.json({ success: true, message: result });
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.post('/groups', (req, res) => {
  const { name, description } = req.body;
  addGroup(name, description).then((result) => {
      res.json(result);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.delete('/groups/:name', (req, res) => {
  const name = req.params.name;
  deleteGroup(name).then((result) => {
      res.json(result);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.post('/clients', (req, res) => {
  const { ip } = req.body;
  addClient(ip).then((result) => {
      res.json(result);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.delete('/clients/:ip', (req, res) => {
  const ip = req.params.ip;
  removeClient(ip).then((result) => {
      res.json(result);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.post('/clients/:ip/groups/:group', (req, res) => {
  const ip = req.params.ip;
  const group = req.params.group;
  addClientToGroup(ip, group).then((result) => {
      res.json(result);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.delete('/clients/:ip/groups/:group', (req, res) => {
  const ip = req.params.ip;
  const group = req.params.group;
  removeClientFromGroup(ip, group).then((result) => {
      res.json(result);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.post('/domains/:domain/groups/:group', (req, res) => {
  const domain = req.params.domain;
  const group = req.params.group;
  addDomainToGroup(domain, group).then((result) => {
      res.json(result);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.delete('/domains/:domain/groups/:group', (req, res) => {
  const domain = req.params.domain;
  const group = req.params.group;
  removeDomainFromGroup(domain, group).then((result) => {
      res.json(result);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.post('/remove-domain', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Domain name is required' });
  }

  try {
    const result = await removeFromDomainList(name);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove domain', error: error.message });
  }
});


app.post('/domains/:name/enable', (req, res) => {
  const name = req.params.name;
  enableDomain(name).then((result) => {
      res.json(result);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.post('/domains/:name/disable', (req, res) => {
  const name = req.params.name;
  disableDomain(name).then((result) => {
      res.json(result);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});

app.get('/queries', async (req, res) => {
  try {
      const response = await axios.get(`${process.env.SERWER}/admin/api.php?getAllQueries&auth=${process.env.KLUCZ}`);
      res.json(response.data);
  } catch (error) {
      res.status(500).send(`Error fetching queries: ${error.message}`);
  }
});

//requires further diagnosis and testing due to lack of data
app.get('/queries-last-24-hours', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?getAllQueries&auth=${process.env.KLUCZ}`);
        if (response.status === 200 && response.data) {
            const allQueries = response.data.data;
            const filteredQueries = filterQueriesFromLast24Hours(allQueries);
            res.json(filteredQueries);
        } else {
            throw new Error('Failed to fetch queries from Pi-hole API');
        }
    } catch (error) {
        console.error('Error fetching queries from the last 24 hours:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});


app.get('/top-clients', async (req, res) => {
  try {
      const response = await axios.get(`${process.env.SERWER}/admin/api.php?auth=${process.env.KLUCZ}&topClients=10`);
      res.json(response.data);
  } catch (error) {
      res.status(500).send(`Error fetching top clients: ${error.message}`);
  }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running properly.`);
});