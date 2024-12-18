const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adlistController = require('../controllers/adlistController');

router.use(auth);

router.post('/addAdlist', adlistController.addAdlist);
router.post('/removeAdlist', adlistController.removeAdlist);
router.post('/editAdlistAddress', adlistController.editAdlistAddress);
router.post('/editAdlistComment', adlistController.editAdlistComment);
router.post('/enableAdlist', adlistController.enableAdlist);
router.post('/disableAdlist', adlistController.disableAdlist);
router.post('/addAdlistToGroup', adlistController.addAdlistToGroup);
router.post('/removeAdlistFromGroup', adlistController.removeAdlistFromGroup);

router.get('/getAdlists', adlistController.getAdlists);
router.get('/getAdlistGroups', adlistController.getAdlistGroups);

module.exports = router;