// Load express module with `require` directive
const express = require('express');
const logger = require('./logger');

const app = express();

const asyncMiddleware = fn => (req, res) => Promise.resolve(fn(req, res));

app.get(
  '/',
  asyncMiddleware(async (req, res) => {
    await res.send(
      "<h1 style='text-align: center; font-size: 64px'>This is k8s Demo site from node.js project</h1>",
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
