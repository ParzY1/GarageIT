const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const bearerToken = token.replace('Bearer ', '');
        const user = await User.findOne({ token: bearerToken });
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const decoded = jwt.verify(bearerToken, user.tokenSecret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = auth;