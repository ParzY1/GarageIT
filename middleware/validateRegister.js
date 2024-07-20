const { check, validationResult } = require('express-validator');

const validateRegister = [
    check('username')
        .isAlphanumeric().withMessage('Username must be alphanumeric')
        .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters long'),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateRegister;
