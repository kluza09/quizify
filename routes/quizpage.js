var express = require('express');
var router = express.Router();
var shuffle = require('../public/javascripts/function');
var mongoose = require('mongoose');
var modelsDB = require('../public/javascripts/modelsDB');
var auth = require('../public/javascripts/auth');
var count = 0;
var questionCounter = 0;
var usedQuestions = [];
var questionNumber;

/* GET Quiz page. */
router.get('/', function(req, res, next) {
  if(auth.isLogged()){
    if(questionCounter != 5){
      questionCounter++
      modelsDB.QuizQestionModel.find({},function(e,docs){
          do {
            questionNumber = Math.floor(Math.random()*docs.length);
          } while (auth.isQuestionRepeat(questionNumber,usedQuestions));
          usedQuestions.push(questionNumber);
          res.render('quizpage', { title: 'QUIZ', "questions" : docs[questionNumber], func: shuffle });
      });
    } else {
      var score = count;
      questionCounter = 0;
      count = 0;
      usedQuestions = [];
      res.render('quizend',{score: score})
    }
  } else {
    res.redirect('/');
  }
});

router.post('/', function(req, res) {
  if(req.body.correct=="true"){
    count++;
  }
  console.log(count);
});


module.exports = router;
