var express = require('express');
var auth = require('../public/javascripts/auth');
var mongoose = require('mongoose');
var modelsDB = require('../public/javascripts/modelsDB');
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

router.get('/settings', function(req, res, next) {
  if(auth.isLogged()){
    res.render('userpage');
  } else {
    res.redirect('/');
  }
});

router.post('/profile', function(req, res, next) {
  var desc = req.body.desc;
  modelsDB.UserModel.update({ name: global.CurrentUser.name }, { $set: { desc: desc }}, function(err,docs){
    if(err) console.log(err);
    else res.render('userpage_parts/profile', {title: "Profil"});
  });
});

module.exports = router;
