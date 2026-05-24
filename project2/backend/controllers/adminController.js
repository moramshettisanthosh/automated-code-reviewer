const User = require('../models/User');
const Review = require('../models/Review');

const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

const adminStats = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    const totalReviews = reviews.length;
    const averageScore = totalReviews ? Math.round(reviews.reduce((sum, review) => sum + review.qualityScore, 0) / totalReviews) : 0;
    res.json({ totalReviews, averageScore, activeUsers: await User.countDocuments() });
  } catch (error) {
    next(error);
  }
};

module.exports = { listUsers, adminStats };
