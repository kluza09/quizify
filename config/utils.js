var csrf          = require('csurf');
var express       = require('express');
var session       = require('client-sessions');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var crypto        = require('crypto');
var flash         = require('connect-flash');
var sass          = require('node-sass');
var sassMiddleware= require('node-sass-middleware')
var mongo         = require('mongodb')
var mongoose      = require('mongoose');


var middleware = require('../middleware');

/**
 * Given a user object:
 *
 *  - Store the user object as a req.user
 *  - Make the user object available to templates as #{user}
 *  - Set a session cookie with the user object
 *
 *  @param {Object} req - The http request object.
 *  @param {Object} res - The http response object.
 *  @param {Object} user - A user object.
 */
module.exports.createUserSession = function(req, res, user) {
  var cleanUser = {
    name:       user.name,
    email:      user.email,
    desc:       user.desc
  };

  req.session.user = cleanUser;
  req.user = cleanUser;
  res.locals.user = cleanUser;
};

/**
 * Create and initialize an Express application that is 'fully loaded' and
 * ready for usage!
 *
 * This will also handle setting up all dependencies (like database
 * connections).
 *
 * @returns {Object} - An Express app object.
 */
module.exports.createApp = function() {
  mongoose.connect('mongodb://127.0.0.1:27017/questions');

  var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
  });

  var app = express();

  var csrfExclusion = ['/quizpage'];

  // view engine setup
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
      cookieName: 'session',
      secret: 'keyboard cat',
      duration: 30 * 60 * 1000,
      activeDuration: 5 * 60 * 1000,
    }));
  app.use(function(req, res, next){
    if (csrfExclusion.indexOf(req.path) !== -1) {
      next();
    } else {
      csrf()(req, res, next);
    }
  });
  app.use(middleware.simpleAuth);
  app.use(sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'compressed',
    indentedSyntax: true
  }));
  app.use(express.static(path.join(__dirname, '../public')));

  app.use(function(req,res,next){
      req.db = db;
      next();
  });

  //Routes
  var routes = require('../routes/index');
  var register = require('../routes/register');
  var quizpage = require('../routes/quizpage');
  var addquiz = require('../routes/addquiz');
  var logout = require('../routes/logout');
  var userpage = require('../routes/userpage');

  app.use('/', routes);
  app.use('/register', register);
  app.use('/quizpage', quizpage);
  app.use('/addquiz', addquiz);
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

  return app;
};

/**
 * Ensure a user is logged in before allowing them to continue their request.
 *
 * If a user isn't logged in, they'll be redirected back to the login page.
 */

 module.exports.requireLogin = function(req, res, next) {
   if (!req.user) {
     res.redirect('/');
   } else {
     next();
   }
 };

 module.exports.isQuestionRepeat = function(index,array){
  for(var i = 0; i < array.length; i++){
    if(index==array[i]){
      return true;
    }
  }
  return false;
}
