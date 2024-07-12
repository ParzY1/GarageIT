const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateToken = (id, secret) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '1h',
    });
};

const generateRefreshToken = (id, secret) => {
    return jwt.sign({ id }, secret, {
        expiresIn: '7d',
    });
};

const generateSecrets = () => {
    return {
        tokenSecret: crypto.randomBytes(64).toString('hex'),
        refreshTokenSecret: crypto.randomBytes(64).toString('hex')
    };
};

module.exports = { generateToken, generateRefreshToken, generateSecrets };