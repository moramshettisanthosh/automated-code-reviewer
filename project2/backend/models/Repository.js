const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  githubId: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  provider: { type: String, default: 'github' },
  connectedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Repository', repositorySchema);
