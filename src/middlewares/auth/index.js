const { verify } = require('jsonwebtoken');
const { MESSAGES } = require('../../utils/constant');

const authorization = (token) => {
  const authToken = token && token.split(' ')[1];
  if (!authToken) {
    return false;
  }

  try {
    return verify(authToken, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
};

const verifyJwt = async (req, res, next) => {
  try {
    const user = authorization(
      req.headers['x-access-token'] || req.headers.authorization,
    );

    if (user) {
      req.user = user;
      return next();
    }
    return res.unauthorisedError(MESSAGES.UNAUTHORIZED_ERROR);
  } catch (error) {
    return res.unauthorisedError(MESSAGES.UNAUTHORIZED_ERROR);
  }
};

const userAuth = (req, res, next) => {
  try {
    const user = authorization(
      req.headers['x-access-token'] || req.headers.authorization,
    );

    if (user) {
      req.user = user;
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
module.exports = { verifyJwt, userAuth };
