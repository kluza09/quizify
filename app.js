var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sass = require('node-sass');
var sassMiddleware = require('node-sass-middleware')
var mongo = require('mongodb')
var mongoose = require('mongoose');
var modelsDB = require('./public/javascripts/modelsDB');

mongoose.connect('mongodb://127.0.0.1:27017/questions');

var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
});



//Routes
var routes = require('./routes/index');
var register = require('./routes/register');
var quizpage = require('./routes/quizpage');
var categoryquizpage = require('./routes/categoryquizpage');
var addquiz = require('./routes/addquiz');
var logout = require('./routes/logout');
var userpage = require('./routes/userpage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  src: __dirname + '/sass',
  dest: __dirname + '/public',
  debug: true,
  outputStyle: 'compressed',
  indentedSyntax: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/register', register);
//app.use('/registersuccess', registersuccess);
app.use('/quizpage', quizpage);
app.use('/addquiz', addquiz);
app.use('/catquizpage', categoryquizpage);
app.use('/logout', logout);
app.use('/userpage', userpage);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
