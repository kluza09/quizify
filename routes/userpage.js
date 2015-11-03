var express = require('express');
var auth = require('../public/javascripts/auth');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(auth.isLogged()){
    res.render('userpage');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
