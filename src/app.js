// Load express module with `require` directive
const express = require('express');
const os = require('os');
const logger = require('./logger');

const app = express();
const hostname = os.hostname();

// const asyncMiddleware = fn => (req, res, next) =>
//   Promise.resolve(fn(req, res, next)).catch(next);

const asyncMiddleware = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err);
  }
};

app.get(
  '/',
  asyncMiddleware(async (req, res) => {
    await res.send(
      `<h1 style='text-align: center; font-size: 64px'>This is k8s Demo site on ${hostname}</h1>`,
    );
  }),
);

app.get(
  '/user',
  asyncMiddleware(async (req, res) => {
    await res.status(200).json({ name: 'Nick Chow' });
  }),
);

app.use((err, req, res) => {
  logger.error(err);
  res.status(500).json({ message: 'an error occurred' });
});

// for unit testing
module.exports = app;
