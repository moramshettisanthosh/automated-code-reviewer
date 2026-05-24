const express = require('express');
const { register, login, googleLogin, currentUser } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/profile', auth, currentUser);

module.exports = router;
