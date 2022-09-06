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
};

module.exports = { requestHelper };
