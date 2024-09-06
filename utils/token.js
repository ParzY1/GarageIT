const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateToken = (user, secret) => {
    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        assignedServer: user.assignedServer,
        assignedDomain: user.assignedDomain
    }, secret, { expiresIn: '1h' });
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