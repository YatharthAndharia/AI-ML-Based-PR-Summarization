const { createLogger, format, transports } = require('winston');

const customFormat = format.combine(
  format.timestamp({
    format: 'YY-MM-DD HH:mm:ss'
  }),
  format.printf(
    (info) => `{${info.timestamp}  ${info.level} : ${info.message}}`
  )
);

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'log/error.log',
      level: 'error',
      format: customFormat
    }),
    new transports.Console({
      level: 'info',
      format: customFormat
    })
  ]
});

module.exports = { logger };
