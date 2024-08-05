const fs = require('fs');
const path = process.env.FTL_CONFIG_PATH;
const ftlPath = process.env.FTL_CONFIG_PATH;

const getSetting = (key) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return reject(err);
            const regex = new RegExp(`^${key}=(.*)$`, 'm');
            const match = data.match(regex);
            if (match) {
                resolve(match[1]);
            } else {
                resolve(null);
            }
        });
    });
};

const setSetting = (key, value) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return reject(err);

            const regex = new RegExp(`^${key}=.*$`, 'm');
            const newConfig = data.match(regex)
                ? data.replace(regex, `${key}=${value}`)
                : `${data}\n${key}=${value}`;

            fs.writeFile(path, newConfig, 'utf8', (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    });
};

const getFTLSetting = (key) => {
    return new Promise((resolve, reject) => {
        fs.readFile(ftlPath, 'utf8', (err, data) => {
            if (err) return reject(err);
            const regex = new RegExp(`^${key}=(.*)$`, 'm');
            const match = data.match(regex);
            if (match) {
                resolve(match[1]);
            } else {
                resolve(null);
            }
        });
    });
};

const setFTLSetting = (key, value) => {
    return new Promise((resolve, reject) => {
        fs.readFile(ftlPath, 'utf8', (err, data) => {
            if (err) return reject(err);

            const regex = new RegExp(`^${key}=.*$`, 'm');
            const newConfig = data.match(regex)
                ? data.replace(regex, `${key}=${value}`)
                : `${data}\n${key}=${value}`;

            fs.writeFile(ftlPath, newConfig, 'utf8', (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    });
};

module.exports = {
    getSetting,
    setSetting,
    getFTLSetting,
    setFTLSetting
};