var express = require('express');
var http = require('http');
var app = express();

// Other Libraries
var path = require('path');

var bodyParser = require('body-parser');


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
  console.info(`SERVER STARTING...`);
  console.info(`LISTENING ON PORT : ${environment.PORT}`)
  console.info(`SERVER STARTED`);

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