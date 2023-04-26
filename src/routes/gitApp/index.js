const { Router } = require('express');
const { getAccessToken } = require('../../controllers/gitApp/index');

const gitAppRoute = Router();

gitAppRoute.get('/getAccessToken', getAccessToken);

module.exports = { gitAppRoute };
