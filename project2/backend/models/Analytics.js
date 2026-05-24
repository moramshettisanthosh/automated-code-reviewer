const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalReviews: { type: Number, default: 0 },
  languageUsage: { type: Map, of: Number, default: {} },
  commonBugs: { type: [String], default: [] },
  securityIssues: { type: Number, default: 0 },
  performanceIssues: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Analytics', analyticsSchema);
