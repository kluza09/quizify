var express = require('express');
var router = express.Router();
var auth = require('../public/javascripts/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  auth.destroySession();
  res.redirect('/')
});

module.exports = router;
