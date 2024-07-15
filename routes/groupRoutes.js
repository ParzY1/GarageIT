const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/addGroup', groupController.addGroup);
router.post('/deleteGroup', groupController.deleteGroup);

module.exports = router;
