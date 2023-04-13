const { Router } = require('express');
const { getRepos} = require('../../controllers/repo/index');
const { verifyJwt } = require('../../middlewares/auth/index');

const repoRoute = Router();

repoRoute.get('/repos', verifyJwt,getRepos);

module.exports = { repoRoute };
