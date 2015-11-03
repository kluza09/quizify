var express = require('express');
var router = express.Router();
var shuffle = require('../public/javascripts/function');
var mongoose = require('mongoose');
var modelsDB = require('../public/javascripts/modelsDB');
var auth = require('../public/javascripts/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(auth.isLogged());
  if(auth.isLogged()){
    modelsDB.QuizQestionModel.find({},function(e,docs){
        var questionNumber = Math.floor(Math.random()*docs.length);
        res.render('quizpage', { title: 'QUIZ', "questions" : docs[questionNumber], func: shuffle });
    });
  } else {
    res.redirect('/');
  }
});


module.exports = router;
