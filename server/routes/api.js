const express = require('express');
const router = express.Router();
const userActivityController = require('../controllers/userActivityController');

router.get('/cryptoData', userActivityController.getCryptoData);
router.post('/logActivity', userActivityController.logUserActivity);

module.exports = router;