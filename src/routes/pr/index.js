const { Router } = require('express');
const { prListener,getPrStats} = require('../../controllers/pr/index');
const { verifyJwt } = require('../../middlewares/auth');

const prRoute = Router();

prRoute.post('/pr/webhook',prListener);
prRoute.get('/pr/stats',verifyJwt,getPrStats);

module.exports = { prRoute };
