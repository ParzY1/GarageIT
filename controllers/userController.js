const { validationResult } = require('express-validator');
const userService = require('../services/userService');
const auditService = require('../services/auditService');

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, assignedServer } = req.body;
    try {
        const user = await userService.registerUser(username, email, password, assignedServer);
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

    const { identifier, password } = req.body;
    try {
        const user = await userService.loginUser(identifier, password);
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

const verifyToken = async (req, res) => {
    const { token } = req.body;
    try {
        const isValid = await userService.verifyToken(token);
        if (!isValid) {
            return res.json({ valid: false });
        }
        res.json({ valid: true, user: isValid });
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const verifyUserServer = async (req, res) => {
    const { token, serverIp } = req.body;
    try {
        const result = await userService.verifyUserServer(token, serverIp);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const changeUsername = async (req, res) => {
    const { newUsername } = req.body;

    try {
        const result = await userService.changeUsername(req.user.id, newUsername);
        await auditService.logAction('changeUsername', `User ${req.user.id} changed username to ${newUsername}`);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    const { newPassword } = req.body;

    try {
        const result = await userService.changePassword(req.user.id, newPassword);
        await auditService.logAction('changePassword', `User ${req.user.id} changed their password`);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const verifyUser = async (req, res) => {
    try {
        const result = await userService.verifyUser(req.user.id);
        await auditService.logAction('verifyUser', `User ${req.user.id} was verified`);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    refreshToken,
    getUserProfile,
    verifyToken,
    verifyUserServer,
    changeUsername,
    changePassword,
    verifyUser
};
