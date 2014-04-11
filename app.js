// Load the .env file with our config
var dotenv = require('dotenv');
dotenv.load();

var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');

// Models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
});

// Controllers
var homepageController = require('./app/controllers/index');
var joinController = require('./app/controllers/join');
var timesheetController = require('./app/controllers/timesheet');

var app = express();

var WiTi_HOSTNAME = process.env.WITI_HOSTNAME || 'WiTi';
var REDIRECT_TO_WITI_HOSTNAME = !!(process.env.REDIRECT_TO_HOSTNAME || false);

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.enable('trust proxy');

app.use(partials());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

//app.use(require('node-compass')({mode: 'expanded'}));
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');

// Bootstrap db connection
// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } }
  console.log('Connecting to Mongo', process.env.MONGOHQ_URL);
  mongoose.connect(process.env.MONGOHQ_URL, options);
}
connect();

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err)
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect();
});

// Redirect incoming request to the offical hostname
if(REDIRECT_TO_WITI_HOSTNAME) {
  app.use(function(req, res, next) {
    if(REDIRECT_TO_WITI_HOSTNAME && req.host != WiTi_HOSTNAME) {
      var url = 'http://' + WiTi_HOSTNAME + req.path;
      console.log("Redirecting to", url);
      res.redirect(url);
    } else {
      next();
    }
  });
}

// Routes

app.get('/timesheet', timesheetController.weekView);

app.get('/join', joinController.index);
app.get('/join/verify', joinController.verify);
app.post('/join/verify', joinController.verifyCode);

app.get('/', homepageController.index);

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
