'use strict';
// load modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const api = require('./routes/api');

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

//Enables CORS support;
app.use(cors());

// Express Body parse
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// API router
app.use('/api', api);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// Test sequelize connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfuly');
  } catch (err) {
    console.log('Unable to connect to the database: ', err);
  }
})();

// start listening on our port
sequelize.sync({}).then(() => {
  const server = app.listen(app.get('port'), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
  });
});
