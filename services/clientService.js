const sqlite3 = require('sqlite3').verbose();

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
};

module.exports = {
    addClient,
    removeClient,
    addClientToGroup,
    removeClientFromGroup
};
