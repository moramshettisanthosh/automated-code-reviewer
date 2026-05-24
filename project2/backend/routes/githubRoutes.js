const express = require('express');
const { connectRepo, listConnectedRepos, repoDetails } = require('../controllers/githubController');
const { auth } = require('../middleware/auth');

const router = express.Router();
router.post('/connect', auth, connectRepo);
router.get('/repos', auth, listConnectedRepos);
router.get('/repos/:owner/:repo', auth, repoDetails);

module.exports = router;
