const express = require('express');
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const validateRegister = require('../middleware/validateRegister');
const validateLogin = require('../middleware/validateLogin');
const validateRefreshToken = require('../middleware/validateRefreshToken');

const router = express.Router();

router.post('/register', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);
router.post('/refresh-token', validateRefreshToken, userController.refreshToken);

router.get('/profile', auth, userController.getUserProfile);

module.exports = router;
