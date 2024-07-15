const express = require('express');
const router = express.Router();
const domainController = require('../controllers/domainController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/addToBlacklist', domainController.addToBlacklist);
router.post('/addToWhitelist', domainController.addToWhitelist);
router.post('/removeFromBlacklist', domainController.removeFromBlacklist);
router.post('/removeFromWhitelist', domainController.removeFromWhitelist);
router.post('/enableDomain', domainController.enableDomain);
router.post('/disableDomain', domainController.disableDomain);
router.post('/addDomainToGroup', domainController.addDomainToGroup);
router.post('/removeDomainFromGroup', domainController.removeDomainFromGroup);
router.post('/removeFromDomainList', domainController.removeFromDomainList);

module.exports = router;
