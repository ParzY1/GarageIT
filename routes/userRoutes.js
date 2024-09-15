const express = require('express');
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const mailerController = require('../controllers/mailerController');
const auth = require('../middleware/auth');
const validateRegister = require('../middleware/validateRegister');
const validateLogin = require('../middleware/validateLogin');
const validateRefreshToken = require('../middleware/validateRefreshToken');

const router = express.Router();

router.post('/register', [
    check('username', 'Username must be at least 3 characters long and contain only letters and numbers')
        .isLength({ min: 3 })
        .matches(/^[a-zA-Z0-9]+$/),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('assignedDomain', 'Assigned domain is required').not().isEmpty(),
], userController.register);

router.post('/login', [
    check('identifier', 'Please include a valid username or email').notEmpty(),
    check('password', 'Password is required').exists()
], userController.login);

router.post('/logout', auth, userController.logout);

router.post('/refresh-token', validateRefreshToken, userController.refreshToken);
router.post('/verify-token', userController.verifyToken);
router.post('/verify-server', userController.verifyUserServer);

router.put('/change-username', auth, [
    check('newUsername', 'Username must be at least 3 characters long and contain only letters and numbers')
        .isLength({ min: 3 })
        .matches(/^[a-zA-Z0-9]+$/)
], userController.changeUsername);

router.put('/change-password', auth, [
    check('newPassword', 'Password must be at least 6 characters long').isLength({ min: 6 })
], userController.changePassword);

router.put('/verify-user', auth, userController.verifyUser);

router.get('/verify-email', mailerController.verifyEmail);
router.get('/profile', auth, userController.getUserProfile);

module.exports = router;
