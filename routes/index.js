var express = require('express');

var models = require('../config/models');
var utils = require('../config/utils');

var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Quizify', csrfToken: req.csrfToken()});
});

router.post('/', function(req, res, next) {
  if(!req.body.pass || !req.body.user){
    res.render('index', { title: 'Express', errorArray: 'Wypełnij wszystkie pola'});
  } else {
    var passwordMD5 = crypto.createHash('md5').update(req.body.pass).digest("hex");
    models.UserModel.findOne({ name: req.body.user }, function (err, content) {
      if(!content || passwordMD5 != content.password){
        res.render('index', { title: 'Express', errorArray: 'Niepopawna dane użytkownika'});
      } else {
        utils.createUserSession(req, res, content);
        res.redirect('/userpage');
      }
    });
  }
});

module.exports = router;
