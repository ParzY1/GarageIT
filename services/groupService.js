const sqlite3 = require('sqlite3').verbose();

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

const getGroups = async () => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `SELECT * FROM "group"`;
        db.all(query, [], (err, rows) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, data: rows });
        });
    });
};

module.exports = {
    addGroup,
    deleteGroup,
    getGroups
};
