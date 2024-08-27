const User = require('../models/User');
const { generateToken, generateRefreshToken, generateSecrets } = require('../utils/token');
const jwt = require('jsonwebtoken');

const registerUser = async (username, email, password, assignedServer) => {
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
        throw new Error('Username or email already exists');
    }

    const { tokenSecret, refreshTokenSecret } = generateSecrets();
    const user = await User.create({
        username,
        email,
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
        email: user.email,
        token,
        refreshToken,
        assignedServer: user.assignedServer
    };
};

const loginUser = async (identifier, password) => {
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!user || !(await user.matchPassword(password))) {
        throw new Error('Invalid username/email or password');
    }

    const token = generateToken(user._id, user.tokenSecret);
    const refreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);

    user.token = token;
    user.refreshToken = refreshToken;
    await user.save();

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
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

const verifyUserServer = async (token, serverIp) => {
    const user = await User.findOne({ token });

    if (!user) {
        throw new Error('User not found');
    }

    try {
        jwt.verify(token, user.tokenSecret);

        if (user.assignedServer !== serverIp) {
            throw new Error('Access denied: Invalid server');
        }

        return { valid: true, userId: user._id };
    } catch (error) {
        console.error('Error verifying user server:', error.message);
        return { valid: false, error: error.message };
    }
};

const changeUsername = async (userId, newUsername) => {
    const userExists = await User.findOne({ username: newUsername });
    if (userExists) {
        throw new Error('Username already taken');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.username = newUsername;
    await user.save();

    return { message: 'Username updated successfully', username: newUsername };
};

const changePassword = async (userId, newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.password = newPassword;
    await user.save();

    return { message: 'Password updated successfully' };
};

module.exports = {
    registerUser,
    loginUser,
    refreshUserToken,
    getUserProfile,
    verifyToken,
    verifyUserServer,
    changeUsername,
    changePassword
};