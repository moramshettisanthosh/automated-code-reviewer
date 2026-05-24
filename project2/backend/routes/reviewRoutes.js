const express = require('express');
const { submitReview, getHistory, getReviewById, exportReview, getTopSummary } = require('../controllers/reviewController');
const { auth } = require('../middleware/auth');

const router = express.Router();
router.post('/analyze', auth, submitReview);
router.post('/explain', auth, getTopSummary);
router.get('/history', auth, getHistory);
router.get('/:id', auth, getReviewById);
router.get('/:id/export', auth, exportReview);

module.exports = router;
