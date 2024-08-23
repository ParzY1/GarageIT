const axios = require('axios');

async function auth(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const bearerToken = token.replace('Bearer ', '');

        const response = await axios.post(`${process.env.SERWER2}/users/verify-token`, { token: bearerToken });

        if (!response.data.valid) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = response.data.user;
        next();
    } catch (error) {
        console.error('Middleware token verification error:', error.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = auth;