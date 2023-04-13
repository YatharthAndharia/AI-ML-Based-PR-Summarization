const { config } = require('dotenv');

const { app } = require('./app');
const { logger } = require('../log/index.js');
const { routes } = require('./routes/index.js');
const { configuration } = require('./config/index');
const requestHelper = require('./utils/response');

app.use(requestHelper.helper());

config();
app.use(routes);



// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(configuration.port, () => {
  logger.info(`Server is running on port ${configuration.port}`);
});
