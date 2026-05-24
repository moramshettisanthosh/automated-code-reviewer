const axios = require('axios');

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github+json' },
});

const fetchRepositories = async (accessToken) => {
  const response = await githubApi.get('/user/repos', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { per_page: 50, affiliation: 'owner,collaborator' },
  });
  return response.data.map((repo) => ({
    githubId: repo.id,
    name: repo.name,
    url: repo.html_url,
    language: repo.language,
    description: repo.description,
  }));
};

const fetchRepoContents = async ({ owner, repo, path = '' }, accessToken) => {
  const response = await githubApi.get(`/repos/${owner}/${repo}/contents/${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

module.exports = { fetchRepositories, fetchRepoContents };
