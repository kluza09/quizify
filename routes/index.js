var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var modelsDB = require('../public/javascripts/modelsDB');
var auth = require('../public/javascripts/auth');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(auth.isLogged()){
    res.redirect('/userpage');
  } else {
    res.render('index', { title: 'Quizify'});
  }
});

router.post('/', function(req, res, next) {
  if(!req.body.pass || !req.body.user){
    res.render('index', { title: 'Express', errorArray: 'Wypełnij wszystkie pola'});
  } else {
    var passwordMD5 = crypto.createHash('md5').update(req.body.pass).digest("hex");
    modelsDB.UserModel.findOne({ name: req.body.user }, function (err, content) {
      if(!content || passwordMD5 != content.password){
        res.render('index', { title: 'Express', errorArray: 'Niepopawna dane użytkownika'});
      } else {
        res.redirect('/userpage');
        auth.setUserLog(content);
      }
    });
  }
});

module.exports = router;
