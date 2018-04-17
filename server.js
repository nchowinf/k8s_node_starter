// Load express module with `require` directive
const express = require('express');
const winston = require('winston');
// import express =

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: './logs/combined.log',
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

const app = express();

const asyncMiddleware = fn => (req, res) => Promise.resolve(fn(req, res));

// Define request response in root URL (/)
app.get(
  '/',
  asyncMiddleware(async (req, res) => {
    await res.send('Hello World!');
  }),
);

app.use((err, req, res) => {
  logger.error(err);
  res.status(500).json({ message: 'an error occurred' });
});

// Launch listening server on port 3000
app.listen(3000, () => {
  logger.info('app listening on port 3000!');
  logger.info(JSON.stringify(process.env));
});
