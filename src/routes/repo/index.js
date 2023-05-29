const { Router } = require('express');
const {
  getRepos,
  getRepoStats,
  createHook,
  handleRepoCommenting
} = require('../../controllers/repo/index');
const { verifyJwt } = require('../../middlewares/auth/index');

const repoRoute = Router();

repoRoute.get('/repos', verifyJwt, getRepos);
repoRoute.get('/repos/stats', verifyJwt, getRepoStats);
repoRoute.post('/repo/handle/comment', verifyJwt, handleRepoCommenting);
repoRoute.post('/repo/hook', verifyJwt, createHook);

module.exports = { repoRoute };
