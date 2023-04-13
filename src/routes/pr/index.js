const { Router } = require('express');
const { prListener} = require('../../controllers/pr/index');

const prRoute = Router();

prRoute.post('/pr/webhook',prListener);

module.exports = { prRoute };
