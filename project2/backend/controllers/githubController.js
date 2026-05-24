const Repository = require('../models/Repository');
const ActivityLog = require('../models/ActivityLog');
const githubService = require('../services/githubService');

const connectRepo = async (req, res, next) => {
  try {
    const { githubToken } = req.body;
    if (!githubToken) {
      return res.status(400).json({ error: 'GitHub access token required.' });
    }
    const repos = await githubService.fetchRepositories(githubToken);
    await Promise.all(repos.map((repo) => Repository.updateOne(
      { user: req.user._id, githubId: repo.githubId },
      { $set: { ...repo, user: req.user._id } },
      { upsert: true }
    )));
    await ActivityLog.create({ user: req.user._id, action: 'connect_github', meta: { repoCount: repos.length } });
    res.json({ repositories: repos });
  } catch (error) {
    next(error);
  }
};

const listConnectedRepos = async (req, res, next) => {
  try {
    const repos = await Repository.find({ user: req.user._id }).sort({ connectedAt: -1 });
    res.json({ repositories: repos });
  } catch (error) {
    next(error);
  }
};

const repoDetails = async (req, res, next) => {
  try {
    const { owner, repo } = req.params;
    const githubToken = req.headers['x-github-token'];
    if (!githubToken) {
      return res.status(400).json({ error: 'GitHub token header required.' });
    }
    const contents = await githubService.fetchRepoContents({ owner, repo }, githubToken);
    res.json({ contents });
  } catch (error) {
    next(error);
  }
};

module.exports = { connectRepo, listConnectedRepos, repoDetails };
