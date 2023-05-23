const { Router } = require('express');
const {
  prListener,
  getPrStats,
  getOpenPrs,
  handleComment
} = require('../../controllers/pr/index');
const { verifyJwt } = require('../../middlewares/auth');

const prRoute = Router();

prRoute.post('/pr/webhook', prListener);
prRoute.get('/pr/stats', verifyJwt, getPrStats);
prRoute.get('/pr/open', verifyJwt, getOpenPrs);
prRoute.post('/pr/handle', verifyJwt, handleComment);

module.exports = { prRoute };
