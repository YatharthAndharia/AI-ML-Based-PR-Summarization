const { Router } = require('express');
const { helloRoute } = require('./hello/index.js');
const { signupRoute } = require('./signup/index.js');
const { loginRoute } = require('./login/index.js');

const routes = Router();

routes.use(helloRoute);
routes.use(signupRoute);
routes.use(loginRoute);

module.exports = { routes };
