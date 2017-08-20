var express     = require('express'),
    path        = require('path'),
    favicon     = require('serve-favicon'),
    logger      = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    db          = require('./app/models/db')
    jwt         = require('jsonwebtoken'),
    config      = require('./config'),
    colors      = require('colors');
    
// ROUTE REGISTERING
var index = require('./routes/index');

// APP INIT
var app = express();
app.set('view engine', 'ejs');
// CORS MIDDLEWARE
var allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Accept-Language, Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// MODELS 
var User = require('./app/models/users');

// ROUTES REGISTERING
var index = require('./routes/index');
var user = require('./routes/user');

// ROUTES USED
app.use('/api/user', user);
app.use('/', index);

// CATCH ERROR 
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // RENDER ERROR PAGE
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
