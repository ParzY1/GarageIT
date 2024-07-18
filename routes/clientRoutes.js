const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/addClient', clientController.addClient);
router.post('/removeClient', clientController.removeClient);
router.post('/addClientToGroup', clientController.addClientToGroup);
router.post('/removeClientFromGroup', clientController.removeClientFromGroup);
router.post('/editClientIp', clientController.editClientIp);
router.post('/editClientComment', clientController.editClientComment);

router.get('/getClients', clientController.getClients);

module.exports = router;
