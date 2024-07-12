const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, generateRefreshToken, generateSecrets } = require('../utils/token');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const { tokenSecret, refreshTokenSecret } = generateSecrets();
        const user = await User.create({ 
            username, 
            password, 
            tokenSecret, 
            refreshTokenSecret 
        });
        const token = generateToken(user._id, user.tokenSecret);
        const refreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);

        user.token = token;
        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({
            _id: user._id,
            username: user.username,
            token,
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id, user.tokenSecret);
            const refreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);

            user.token = token;
            user.refreshToken = refreshToken;
            await user.save();

            res.json({
                _id: user._id,
                username: user.username,
                token,
                refreshToken,
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/refresh-token', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const user = await User.findOne({ refreshToken: token });
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const decoded = jwt.verify(token, user.refreshTokenSecret);
        const newToken = generateToken(user._id, user.tokenSecret);
        const newRefreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);

        user.token = newToken;
        user.refreshToken = newRefreshToken;
        await user.save();

        res.json({
            token: newToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;