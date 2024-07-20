const User = require('../models/User');
const { generateToken, generateRefreshToken, generateSecrets } = require('../utils/token');

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
        refreshTokenSecret
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

module.exports = {
    registerUser,
    loginUser,
    refreshUserToken,
    getUserProfile,
};