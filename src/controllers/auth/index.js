const { default: fetch } = require('node-fetch');
const jwt = require('jsonwebtoken');
const { MESSAGES } = require('../../utils/constant.js');
const {
  getAccessToken,
  registerUser
} = require('../../services/auth/index.js');

const signinWithGithub = async (req, res) => {
  try {
    const accessToken = await getAccessToken(req.query.code);
    if (accessToken) {
      const response = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      const user = await registerUser({
        data: { ...data, userName: data.login, access_token: accessToken }
      });
      const jwttoken = jwt.sign(user.dataValues, process.env.JWT_SECRET);
      return res.success(MESSAGES.SUCCESS, jwttoken);
    }
    return res.unauthorisedError();
  } catch (error) {
    console.log(error);
    return res.error(error);
  }
};
module.exports = { signinWithGithub };
