const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/logs', auditController.getLogs);

module.exports = router;
