const Review = require('../models/Review');
const UploadedFile = require('../models/UploadedFile');
const ActivityLog = require('../models/ActivityLog');
const aiService = require('../services/aiService');
const { validateLanguage } = require('../utils/validator');

const computeMetrics = (analysisText) => {
  const score = 50 + Math.min(50, Math.floor(analysisText.length / 20));
  return {
    qualityScore: Math.min(100, score),
    readabilityScore: Math.min(100, score + 5),
    maintainabilityScore: Math.min(100, score - 5),
  };
};

const submitReview = async (req, res, next) => {
  try {
    const { code, language, fileName, mode, repository, context } = req.body;
    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required for review.' });
    }
    if (!validateLanguage(language)) {
      return res.status(400).json({ error: 'Unsupported language.' });
    }

    const summary = await aiService.createReviewSummary({ code, language, mode, context });
    const metrics = computeMetrics(summary);

    const review = await Review.create({
      user: req.user._id,
      repository: repository || '',
      language,
      fileName: fileName || 'pasted-code',
      summary,
      details: { analysis: summary },
      qualityScore: metrics.qualityScore,
      readabilityScore: metrics.readabilityScore,
      maintainabilityScore: metrics.maintainabilityScore,
      tags: [mode || 'review', language.toLowerCase()],
    });

    await ActivityLog.create({ user: req.user._id, action: 'submit_review', meta: { language, mode, fileName } });
    res.status(201).json({ review });
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.json({ review });
  } catch (error) {
    next(error);
  }
};

const exportReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.json({ report: review });
  } catch (error) {
    next(error);
  }
};

const getTopSummary = async (req, res, next) => {
  try {
    const { mode, code, language } = req.body;
    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required.' });
    }
    const response = await aiService.analyzeCode({ code, language, mode: mode || 'explain' });
    res.json({ message: response });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitReview, getHistory, getReviewById, exportReview, getTopSummary };
