const express = require('express');
const { listUsers, adminStats } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();
router.get('/users', adminAuth, listUsers);
router.get('/stats', adminAuth, adminStats);

module.exports = router;
