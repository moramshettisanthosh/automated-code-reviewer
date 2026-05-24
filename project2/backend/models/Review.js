const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  repository: { type: String, default: '' },
  language: { type: String, required: true },
  fileName: { type: String, default: 'pasted-code' },
  summary: { type: String },
  details: { type: Object, default: {} },
  qualityScore: { type: Number, default: 0 },
  readabilityScore: { type: Number, default: 0 },
  maintainabilityScore: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
