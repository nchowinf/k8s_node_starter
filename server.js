// Load express module with `require` directive

const app = require('./src/app');
const logger = require('./src/logger');

const port = process.env.PORT || 3000;

// Launch listening server on port 3000
app.listen(port, () => {
  logger.info(`app listening on port ${port}`);
  logger.info(JSON.stringify(process.env));
});
