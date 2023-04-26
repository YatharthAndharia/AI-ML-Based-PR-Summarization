const { Router } = require('express');
const {
  getRepos,
  getRepoStats,
  createHook
} = require('../../controllers/repo/index');
const { verifyJwt } = require('../../middlewares/auth/index');

const repoRoute = Router();

repoRoute.get('/repos', verifyJwt, getRepos);
repoRoute.get('/repos/stats', verifyJwt, getRepoStats);
repoRoute.post('/repo/hook', verifyJwt, createHook);

module.exports = { repoRoute };
