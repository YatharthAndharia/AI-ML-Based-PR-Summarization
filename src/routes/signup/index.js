const { Router } = require('express');
const { Auth } = require('../../controllers/index.js');

const signupRoute = Router();

signupRoute.post('/signup', Auth.signup);

module.exports = { signupRoute };
