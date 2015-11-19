var express = require('express');
var utils = require('../config/utils');
var models = require('../config/models');
var router = express.Router();
var lastGames;
var allGames = [];

router.get('/', utils.requireLogin, function(req, res, next) {
    res.render('userpage');
});

router.get('/profile', utils.requireLogin, function(req, res, next) {
  res.render('userpage_parts/profile', {title: "Profil" , csrfToken: req.csrfToken()});
});

router.get('/archives', utils.requireLogin, function(req, res, next) {
  allGames = [];

  models.ArchModel.find({player: req.user.name},function(e,docs){
    lastGames = docs;

    models.QuizQestionModel.find({},function(e,docs){
      for(var j = 0; j < lastGames.length; j++){
        game = [];
        for(var i = 0; i < lastGames[j].questions.length; i++){
          game.push(docs[lastGames[j].questions[i].questionNumber]);
        }
        allGames.push(game);
      }
      res.render('userpage_parts/archives',{title: "Ostatnio Rozegrane", games:allGames.reverse(), UserAns:lastGames.reverse() });
    });
  });
});

router.get('/settings', utils.requireLogin, function(req, res, next) {
    res.render('userpage');
});

router.post('/profile', function(req, res, next) {
  var desc = req.body.desc;
  models.UserModel.update({ name: req.user.name }, { $set: { desc: desc }}, function(err,docs){
    if(err) console.log(err);
    else {
      models.UserModel.findOne({ name: req.user.name }, function (err, content) {
        if(err) console.log(err);
        else {
          utils.createUserSession(req, res, content);
          res.redirect('/userpage/profile');
        }
      });
    }
  });
});

module.exports = router;
