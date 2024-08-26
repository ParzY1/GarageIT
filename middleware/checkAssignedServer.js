const axios = require('axios');
require('dotenv').config();

const checkAssignedServer = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const serverIp = process.env.VALID_SERWER;

    try {
        const response = await axios.post(`${process.env.SERWER2}/users/verify-server`, {
            token,
            serverIp
        });


        if (!response.data.valid) {
            return res.status(403).json({ message: 'Access denied: Invalid server' });
        }

        req.userId = response.data.userId;
        next();
    } catch (error) {
        console.error('Error verifying server: ', error.message);
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = checkAssignedServer