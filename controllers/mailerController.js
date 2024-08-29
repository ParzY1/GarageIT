const userService = require('../services/userService');

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await userService.verifyToken(token);
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        await userService.verifyUser(user.user._id); // Mark the user as verified
        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    verifyEmail,
};