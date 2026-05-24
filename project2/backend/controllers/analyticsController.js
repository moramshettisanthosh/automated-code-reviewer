const Review = require('../models/Review');

const getAnalytics = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user._id });
    const totalReviews = reviews.length;
    const languageUsage = reviews.reduce((acc, review) => {
      const key = review.language || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const topIssues = reviews.flatMap((review) => {
      const text = review.summary || '';
      return text.match(/bug|vulnerability|issue|warning|optimization/gi) || [];
    });
    const commonBugs = [...new Set(topIssues.map((term) => term.toLowerCase()))].slice(0, 6);
    const averageQuality = totalReviews ? Math.round(reviews.reduce((sum, review) => sum + review.qualityScore, 0) / totalReviews) : 0;
    const averageReadability = totalReviews ? Math.round(reviews.reduce((sum, review) => sum + review.readabilityScore, 0) / totalReviews) : 0;
    const averageMaintainability = totalReviews ? Math.round(reviews.reduce((sum, review) => sum + review.maintainabilityScore, 0) / totalReviews) : 0;

    res.json({
      totalReviews,
      languageUsage,
      commonBugs,
      averageQuality,
      averageReadability,
      averageMaintainability,
      reviewTrends: reviews.slice(0, 10).map((review) => ({ date: review.createdAt, qualityScore: review.qualityScore, language: review.language })),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnalytics };
