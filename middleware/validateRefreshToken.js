const { check, validationResult } = require('express-validator');

const validateRefreshToken = [
    check('token').isJWT().withMessage('Invalid token format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateRefreshToken;
