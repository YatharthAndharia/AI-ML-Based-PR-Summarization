const { Router } = require('express');
const { Auth } = require('../../controllers/index.js');

const loginRoute = Router();

loginRoute.post('/login', Auth.login);

module.exports = { loginRoute };
