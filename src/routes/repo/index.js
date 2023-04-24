const { Router } = require('express');
const { getRepos,getRepoStats} = require('../../controllers/repo/index');
const { verifyJwt } = require('../../middlewares/auth/index');

const repoRoute = Router();

repoRoute.get('/repos', verifyJwt,getRepos);
repoRoute.get('/repos/stats', verifyJwt,getRepoStats);

module.exports = { repoRoute };
