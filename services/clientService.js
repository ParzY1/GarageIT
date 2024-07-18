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

const getClients = () => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `
            SELECT 
                c.id, c.ip, c.date_added, c.date_modified, c.comment, 
                GROUP_CONCAT(g.name, ', ') AS groups 
            FROM client c
            LEFT JOIN client_by_group cbg ON c.id = cbg.client_id
            LEFT JOIN "group" g ON cbg.group_id = g.id
            GROUP BY c.id, c.ip, c.date_added, c.date_modified, c.comment
        `;

        db.all(query, [], (err, rows) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, data: rows });
        });
    });
};

const editClientIp = (oldIp, newIp) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `UPDATE client SET ip = ? WHERE ip = ?`;
        db.run(query, [newIp, oldIp], function (err) {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Client IP changed from "${oldIp}" to "${newIp}" successfully` });
        });
    });
};

const editClientComment = (ip, comment) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `UPDATE client SET comment = ?, date_modified = strftime('%s','now') WHERE ip = ?`;
        db.run(query, [comment, ip], function (err) {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Comment for client with IP "${ip}" updated successfully` });
        });
    });
};

module.exports = {
    addClient,
    removeClient,
    addClientToGroup,
    removeClientFromGroup,
    getClients,
    editClientIp,
    editClientComment
};
