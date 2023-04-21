const { Router } = require('express');
const { helloRoute } = require('./hello/index.js');
const { signupRoute } = require('./signup/index.js');
const { loginRoute } = require('./login/index.js');
const {gitAppRoute}=require('./gitApp/index.js')
const {repoRoute} =require('./repo/index.js')
const {prRoute}=require('./pr/index.js')
const {commitRoute}=require('./commit/index.js')

const routes = Router();

routes.use(helloRoute);
routes.use(signupRoute);
routes.use(loginRoute);
routes.use(gitAppRoute);
routes.use(repoRoute);
routes.use(prRoute)
routes.use(commitRoute)

module.exports = { routes };
