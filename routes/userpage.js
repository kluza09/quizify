var express = require('express');
var auth = require('../public/javascripts/auth');
var mongoose = require('mongoose');
var modelsDB = require('../public/javascripts/modelsDB');
var router = express.Router();
var lastGames;
var allGames = [];

router.get('/', function(req, res, next) {
  if(auth.isLogged()){
    res.render('userpage',{title: global.CurrentUser.name});
  } else {
    res.redirect('/');
  }
});

router.get('/profile', function(req, res, next) {
  res.render('userpage_parts/profile', {title: "Profil"});
});

router.get('/archives', function(req, res, next) {
  allGames = [];
  if(auth.isLogged()){

    modelsDB.ArchModel.find({player:global.CurrentUser.name},function(e,docs){
      lastGames = docs;

      modelsDB.QuizQestionModel.find({},function(e,docs){
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

  } else {
    res.redirect('/');
  }
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
    else {
      modelsDB.UserModel.findOne({ name: global.CurrentUser.name }, function (err, content) {
        if(err) console.log(err);
        else {
          auth.setUserLog(content);
          res.redirect('/userpage/profile');
        }
      });
    }
  });
});

module.exports = router;
