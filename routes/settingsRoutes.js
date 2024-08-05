const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/dnsmasq-listening', settingsController.getDNSMasqListening);
router.post('/dnsmasq-listening', settingsController.setDNSMasqListening);

router.get('/dns-fqdn-required', settingsController.getDNSFQDNRequired);
router.post('/dns-fqdn-required', settingsController.setDNSFQDNRequired);

router.get('/dns-bogus-priv', settingsController.getDNSBogusPriv);
router.post('/dns-bogus-priv', settingsController.setDNSBogusPriv);

router.get('/dnssec', settingsController.getDNSSEC);
router.post('/dnssec', settingsController.setDNSSEC);

router.get('/dns-servers', settingsController.getDNSServers);
router.post('/dns-servers', settingsController.setDNSServers);

router.get('/privacy-level', settingsController.getPrivacyLevel);
router.post('/privacy-level', settingsController.setPrivacyLevel);

router.get('/rate-limit', settingsController.getRateLimit);
router.post('/rate-limit', settingsController.setRateLimit);

module.exports = router;