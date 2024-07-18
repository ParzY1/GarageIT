const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

const addToBlacklist = async (domain) => {
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
};

const addToWhitelist = async (domain) => {
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
};

const removeFromBlacklist = async (domain) => {
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
};

const removeFromWhitelist = async (domain) => {
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
};

const getBlacklist = async () => {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?list=black&auth=${process.env.KLUCZ}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching blacklist: ${error.message}`);
    }
};

const getWhitelist = async () => {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?list=white&auth=${process.env.KLUCZ}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching whitelist: ${error.message}`);
    }
};

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

const changeDomainListType = (domain) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const selectQuery = `SELECT type FROM domainlist WHERE domain = ?`;
        db.get(selectQuery, [domain], (err, row) => {
            if (err) {
                db.close();
                return reject(err);
            }

            if (!row) {
                db.close();
                return reject(new Error(`Domain "${domain}" not found`));
            }

            const newType = row.type === 0 ? 1 : 0;
            const updateQuery = `UPDATE domainlist SET type = ? WHERE domain = ?`;
            db.run(updateQuery, [newType, domain], function (err) {
                db.close();
                if (err) {
                    return reject(err);
                }
                resolve({ success: true, message: `Domain "${domain}" type changed successfully to ${newType === 0 ? 'whitelist' : 'blacklist'}` });
            });
        });
    });
};

const editDomainName = (oldDomain, newDomain) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `UPDATE domainlist SET domain = ? WHERE domain = ?`;
        db.run(query, [newDomain, oldDomain], function (err) {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Domain name changed from "${oldDomain}" to "${newDomain}" successfully` });
        });
    });
};

const editDomainComment = (domain, comment) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `UPDATE domainlist SET comment = ? WHERE domain = ?`;
        db.run(query, [comment, domain], function (err) {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Comment for domain "${domain}" changed successfully` });
        });
    });
};


module.exports = {
    addToBlacklist,
    addToWhitelist,
    removeFromBlacklist,
    removeFromWhitelist,
    getBlacklist,
    getWhitelist,
    enableDomain,
    disableDomain,
    addDomainToGroup,
    removeDomainFromGroup,
    removeFromDomainList,
    changeDomainListType,
    editDomainName,
    editDomainComment
};
