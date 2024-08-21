const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const bearerToken = token.replace('Bearer ', '');

        const response = await axios.post(`${process.env.SERWER}/verify-token`, { token: bearerToken });

        if (!response.data.valid) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = response.data.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = auth;