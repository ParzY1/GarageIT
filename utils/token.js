const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateToken = (userId, secret) => {
    return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
};

const generateRefreshToken = (userId, secret) => {
    return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
};

const generateSecrets = () => {
    const tokenSecret = crypto.randomBytes(64).toString('hex');
    const refreshTokenSecret = crypto.randomBytes(64).toString('hex');
    return { tokenSecret, refreshTokenSecret };
};

module.exports = { generateToken, generateRefreshToken, generateSecrets };