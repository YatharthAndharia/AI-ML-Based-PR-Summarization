process.env.NODE_CONFIG_DIR = `${__dirname}/`;

const config = require('config');
const { config: configure } = require('dotenv');

configure();

const configuration = {
  port: config.get('server.port'),
  openai_apikey:process.env.OPENAI_API_KEY
};

module.exports = { configuration };
