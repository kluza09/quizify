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

router.get('/profile', function(req, res, next) {
  res.render('userpage_parts/profile', {title: "Profil"});
});

module.exports = router;
