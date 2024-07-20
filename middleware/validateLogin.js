const { check, validationResult } = require('express-validator');

const validateLogin = [
    check('username')
        .isAlphanumeric().withMessage('Invalid credentials.')
        .isLength({ min: 3, max: 50 }).withMessage('Invalid credentials.'),
    check('password')
        .isLength({ min: 6 }).withMessage('Invalid credentials.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateLogin;
