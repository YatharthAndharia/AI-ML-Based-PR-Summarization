const { Router } = require('express');
const {getUserData } = require('../../controllers/user/index');
const { verifyJwt } = require('../../middlewares/auth/index');

const userRoute = Router();

userRoute.get('/user', verifyJwt,getUserData);

module.exports = { userRoute };
