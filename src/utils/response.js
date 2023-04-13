const { STATUS_CODES, MESSAGES } = require("./constant");

// eslint-disable-next-line no-unused-vars
const requestHelper = (req, res, next) => {
  res.success = (message, data = null) => {
    res.statusCode = 200;
    res.json({
      code: 200,
      message,
      data
    });
  };

  res.unauthorisedError = (message = null) => {
    res.statusCode = STATUS_CODES.UNAUTHORIZED;
    res.json({
      message: message || MESSAGES.UNAUTHORIZED_ERROR
    });
  };

  res.error = (message) => {
    res.json({
      message
    });
  };
  next()
};

module.exports = { helper:()=>requestHelper };
