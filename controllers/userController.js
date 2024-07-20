const { validationResult } = require('express-validator');
const userService = require('../services/userService');
const auditService = require('../services/auditService');

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        const user = await userService.registerUser(username, password);
        await auditService.logAction('registerUser', `Registered user ${user.username}`);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        const user = await userService.loginUser(username, password);
        await auditService.logAction('loginUser', `User ${user.username} logged in`);
        res.json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const refreshToken = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { token } = req.body;
    try {
        const tokens = await userService.refreshUserToken(token);
        await auditService.logAction('refreshUserToken', `Token refreshed`);
        res.json(tokens);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userProfile = await userService.getUserProfile(req.user.id);
        res.json(userProfile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    register,
    login,
    refreshToken,
    getUserProfile,
};
