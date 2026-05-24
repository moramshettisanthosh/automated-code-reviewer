const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const { auth } = require('../middleware/auth');

const router = express.Router();
router.get('/summary', auth, getAnalytics);

module.exports = router;
