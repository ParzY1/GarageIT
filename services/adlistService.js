const { resolve } = require('path');

const sqlite3 = require('sqlite3').verbose();

const getAdlists = () => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = 'SELECT * FROM adlist';

        db.all(query, [], (err, rows) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, data: rows });
        });
    });
};

const addAdlist = (address, comment) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `INSERT INTO "adlist" (address, comment) VALUES (?, ?)`;

        db.run(query, [address, comment], (err) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: 'Adlist added successfully', id: this.lastID });
        });
    });
};

const removeAdlist = (address) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `DELETE FROM adlist WHERE address = ?`;

        db.run(query, [address], (err) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Adlist with address ${address} removed successfully` });
        });
    });
};

const editAdlistAddress = (oldAddress, newAddress) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `UPDATE adlist SET address = ? WHERE address = ?`;

        db.run(query, [newAddress, oldAddress], (err) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Adlist with address ${oldAddress} updated successfully` });
        });
    });
};

const editAdlistComment = (address, comment) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `UPDATE adlist SET comment = ? WHERE address = ?`;

        db.run(query, [comment, address], (err) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Adlist with address ${address} updated successfully` });
        });
    });
};

const enableAdlist = (address) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `UPDATE adlist SET enabled = 1 WHERE address = ?`;

        db.run(query, [address], (err) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Adlist with address ${address} enabled successfully` });
        });
    });
};

const disableAdlist = (address) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `UPDATE adlist SET enabled = 0 WHERE address = ?`;

        db.run(query, [address], (err) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Adlist with address ${address} disabled successfully` });
        });
    });    
};

const addAdlistToGroup = (address, group) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `INSERT INTO adlist_by_group (adlist_id, group_id) VALUES (
            (SELECT id FROM adlist WHERE address = ?),
            (SELECT id FROM "group" WHERE name = ?)
        )`;

        db.run(query, [address, group], (err) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Adlist with address ${address} added to group `});
        });
    });
};

const removeAdlistFromGroup = (address, group) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `DELETE FROM adlist_by_group 
        WHERE adlist_id = (SELECT id FROM adlist WHERE address = ?)
        AND group_id = (SELECT id FROM "group" WHERE name = ?)`;

        db.run(query, [address, group], (err) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, message: `Adlist with address ${address} removed from group` });
        });
    });    
};

const getAdlistGroups = (address) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(process.env.BAZA, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                return reject(err);
            }
        });

        const query = `SELECT adlist_id, group_id FROM adlist_by_group WHERE adlist_id = (SELECT id FROM adlist WHERE address = ?)`;

        db.all(query, [address], (err, rows) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve({ success: true, data: rows });
        });
    });    
};

module.exports = {
    getAdlists,
    addAdlist,
    removeAdlist,
    editAdlistAddress,
    editAdlistComment,
    enableAdlist,
    disableAdlist,
    addAdlistToGroup,
    removeAdlistFromGroup,
    getAdlistGroups
};