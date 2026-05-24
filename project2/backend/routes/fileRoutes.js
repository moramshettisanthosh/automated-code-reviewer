const express = require('express');
const { uploadFile, getUploadedFiles } = require('../controllers/fileController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();
router.post('/upload', auth, upload.single('source'), uploadFile);
router.get('/', auth, getUploadedFiles);

module.exports = router;
