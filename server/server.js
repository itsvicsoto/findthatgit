var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

// Other Libraries
var path = require('path');
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var asyncLib = require('async');
var url = require('url');

var request = require('request');
var schedule = require('node-schedule');
var querystring = require('querystring');

// Engine Dependencies
var consolidate = require('consolidate');

// Logger
var moment = require('moment');
var morgan = require('morgan');
var winston = require('winston');
var rfs = require('rotating-file-stream');
var rotateTransport = require('winston-logrotate');
// Log level
var level = process.env.LOG_LEVEL || 'debug';

// command check
var commandExistsSync = require('command-exists').sync;

// Load environment based on NODE_ENV
var environment;
var runOnEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

if (runOnEnv == 'production') {
  environment = require('./config/environment.json');
} else if (runOnEnv == 'staging') {
  environment = require('./config/environment-staging.json');
} else {
  // You must create a file called environment-dev.json under
  // ./config and follow the environment format
  environment = require('./config/environment-local.json');
}

// Middlewares
app.use(bodyParser.json({
  limit: '50mb',
  type: 'application/json'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

// When Accessing Specific files
app.use('/', express.static(path.resolve(__dirname, '../app/dashboard')));
app.use('/vendor', express.static(path.resolve(__dirname, '../bower_components')));

var register = function(app) {

  var wkhtmltopdfStatus = false;

  if (commandExistsSync('wkhtmltopdf')) {
    wkhtmltopdfStatus = true;
  }

  // logger.info(`======================================================`);
  logger.info(`SERVER STARTING...`);
  // logger.info(`------------------------------------------------------`)
  logger.info(`LISTENING ON PORT : ${environment.PORT}`)
  // logger.info(`------------------------------------------------------`)

  // logger.info(`------------------------------------------------------`)
  if (!wkhtmltopdfStatus) {
    logger.error(`URGENT :: WKHTMLTOPDF is missing on the command line`)
    // logger.info(`------------------------------------------------------`)
  }
  logger.info(`SERVER STARTED`);
  // logger.info(`======================================================`)


  // Catching All Pages that arent found
  app.use('*', function(req, res, next) {

    return next();

  });


  // ROUTES
  require('./routes/dashboard')(app);

  // Catching All Pages that arent found
  app.use('*', function(req, res) {
    res.redirect('/page-not-found')
  });

}

register(app);

http.createServer(app).listen(environment.PORT_HTTP);