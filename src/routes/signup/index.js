const { Router } = require('express');
const { signinWithGithub } = require('../../controllers/auth/index');

const signupRoute = Router();

signupRoute.post('/signup', signinWithGithub);

module.exports = { signupRoute };
