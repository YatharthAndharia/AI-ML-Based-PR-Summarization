const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(compression());

module.exports = { app };
