const { Router } = require('express');
const { listenCommit, getCommitData } = require('../../controllers/commit/index');
const { verifyJwt } = require('../../middlewares/auth');

const commitRoute = Router();

commitRoute.post('/commit/webhook', listenCommit);
commitRoute.get('/commits',verifyJwt,getCommitData)

module.exports = { commitRoute };
