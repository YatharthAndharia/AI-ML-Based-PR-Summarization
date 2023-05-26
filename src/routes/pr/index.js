const { Router } = require('express');
const {
  prListener,
  getPrStats,
  getOpenPrs,
  handleComment,
  getPrs
} = require('../../controllers/pr/index');
const { verifyJwt } = require('../../middlewares/auth');

const prRoute = Router();

prRoute.get('/pr', verifyJwt, getPrs);
prRoute.post('/pr/webhook', prListener);
prRoute.get('/pr/stats', verifyJwt, getPrStats);
prRoute.get('/pr/open', verifyJwt, getOpenPrs);
prRoute.post('/pr/handle', verifyJwt, handleComment);

module.exports = { prRoute };
