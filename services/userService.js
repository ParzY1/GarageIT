const User = require('../models/User');
const { generateToken, generateRefreshToken, generateSecrets } = require('../utils/token');
const jwt = require('jsonwebtoken');

const registerUser = async (username, password) => {
    const userExists = await User.findOne({ username });
    if (userExists) {
        throw new Error('User already exists');
    }

    const { tokenSecret, refreshTokenSecret } = generateSecrets();
    const user = await User.create({
        username,
        password,
        tokenSecret,
        refreshTokenSecret,
        assignedServer
    });

    const token = generateToken(user._id, user.tokenSecret);
    const refreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);

    user.token = token;
    user.refreshToken = refreshToken;
    await user.save();

    return {
        _id: user._id,
        username: user.username,
        token,
        refreshToken,
        assignedServer: user.assignedServer
    };
};

const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
        throw new Error('Invalid username or password');
    }

    const token = generateToken(user._id, user.tokenSecret);
    const refreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);

    user.token = token;
    user.refreshToken = refreshToken;
    await user.save();

    return {
        _id: user._id,
        username: user.username,
        token,
        refreshToken,
    };
};

const refreshUserToken = async (refreshToken) => {
    const user = await User.findOne({ refreshToken });
    if (!user) {
        throw new Error('Invalid token');
    }

    const newToken = generateToken(user._id, user.tokenSecret);
    const newRefreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);

    user.token = newToken;
    user.refreshToken = newRefreshToken;
    await user.save();

    return {
        token: newToken,
        refreshToken: newRefreshToken,
    };
};

const getUserProfile = async (userId) => {
    return await User.findById(userId).select('-password');
};

const verifyToken = async (token) => {
    const user = await User.findOne({ token });
    if (!user) {
        return null;
    }

    console.log('Token Secret:', user.tokenSecret);
    try {
        const decoded = jwt.verify(token, user.tokenSecret);
        return { user: decoded, assignedServer: user.assignedServer };
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return null;
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshUserToken,
    getUserProfile,
    verifyToken,
};