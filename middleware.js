var mongoose = require('mongoose');
var models = require('./config/models');
var utils = require('./config/utils');

/**
 * A simple authentication middleware for Express.
 *
 * This middleware will load users from session data, and handle all user
 * proxying for convenience.
 */

module.exports.simpleAuth = function(req, res, next) {
  if (req.session && req.session.user) {
    models.UserModel.findOne({ email: req.session.user.email }, 'name email desc', function(err, user) {
      if (user) {
        utils.createUserSession(req, res, user);
      }
      next();
    });
  } else {
    next();
  }
}
