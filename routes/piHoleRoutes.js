const express = require('express');
const router = express.Router();
const piHoleController = require('../controllers/piHoleController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/summary-statistics', piHoleController.getSummaryStatistics);
router.get('/queries', piHoleController.getAllQueries);
router.get('/queries-last-24-hours', piHoleController.getQueriesLast24Hours);
router.get('/top-clients', piHoleController.getTopClients);

module.exports = router;
