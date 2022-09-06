const { Router } = require('express');
const { HelloController } = require('../../controllers/index.js');

const helloRoute = Router();

helloRoute.get('/hello', HelloController.hello);

module.exports = { helloRoute };
