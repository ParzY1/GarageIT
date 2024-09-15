const User = require('../models/User');
const { generateToken, generateRefreshToken, generateSecrets } = require('../utils/token');
const { sendVerificationEmail } = require('./mailerService');
const TokenBlacklist = require('../models/TokenBlacklist');
const jwt = require('jsonwebtoken');

const registerUser = async (username, email, password, assignedServer, assignedDomain) => {
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
        assignedServer,
        assignedDomain,
        verified: false
    });

    const token = generateToken(user, user.tokenSecret);
    const refreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);

    user.token = token;
    user.refreshToken = refreshToken;
    await user.save();

    await sendVerificationEmail(user.email, token);

    return {
        token,
        refreshToken,
    };
};

const loginUser = async (identifier, password) => {
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!user || !(await user.matchPassword(password))) {
        throw new Error('Invalid username/email or password');
    }

    let refreshToken = user.refreshToken;
    let tokenExpiryCheck;

    try {
        const decodedRefreshToken = jwt.decode(refreshToken);
        const currentTime = Date.now() / 1000;


        tokenExpiryCheck = decodedRefreshToken.exp - currentTime < (24 * 60 * 60);

        if (tokenExpiryCheck || !decodedRefreshToken) {
            refreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);
        }
    } catch (error) {
        refreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);
    }

    const token = generateToken(user, user.tokenSecret);

    user.token = token;
    user.refreshToken = refreshToken;
    await user.save();

    return {
        token,
        refreshToken,
    };
};
const logoutUser = async (token) => {
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
        const expiryDate = new Date(decoded.exp * 1000);
        await TokenBlacklist.create({ token, expiryDate });
    }
};

const refreshUserToken = async (refreshToken) => {
    try {
        const blacklisted = await TokenBlacklist.findOne({ token: refreshToken });
        if (blacklisted) {
            throw new Error('Refresh token has been invalidated');
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('Invalid user');
        }

        const newAccessToken = generateToken(user, user.tokenSecret);

        const currentTime = Date.now() / 1000;
        const tokenExpiryCheck = decoded.exp - currentTime < (24 * 60 * 60);

        let newRefreshToken = refreshToken;
        if (tokenExpiryCheck) {
            newRefreshToken = generateRefreshToken(user._id, user.refreshTokenSecret);
            user.refreshToken = newRefreshToken;
        }

        await user.save();

        return {
            token: newAccessToken,
            refreshToken: newRefreshToken,
        };
    } catch (error) {
        throw new Error(error.message || 'Error refreshing token');
    }
};


const getUserProfile = async (userId) => {
    return await User.findById(userId).select('-password');
};

const verifyToken = async (token) => {
    try {
        const blacklisted = await TokenBlacklist.findOne({ token });
        if (blacklisted) {
            return null;
        }

        const decoded = jwt.decode(token);
        const user = await User.findOne({ _id: decoded.id, token });
        if (!user) {
            return null;
        }
        jwt.verify(token, user.tokenSecret);
        return { user, assignedServer: user.assignedServer };
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

const verifyUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.verified = true;
    await user.save();

    return { message: 'User verified successfully', verified: user.verified };
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshUserToken,
    getUserProfile,
    verifyToken,
    verifyUserServer,
    changeUsername,
    changePassword,
    verifyUser
};