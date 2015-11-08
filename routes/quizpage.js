var express = require('express');
var router = express.Router();
var shuffle = require('../public/javascripts/function');
var mongoose = require('mongoose');
var modelsDB = require('../public/javascripts/modelsDB');
var auth = require('../public/javascripts/auth');
var count = 0;
var questionCounter = 0;
var usedQuestions = [];
var usedAnswers = [];
var questionNumber;
var clickedAns;

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
      var scoreTemp = count;

      questionCounter = 0;
      count = 0;
      var d = new Date()

      // Creating archive file
      var Archivum = new modelsDB.ArchModel({
        player: global.CurrentUser.name,
        questions: [],
        score: scoreTemp,
        date: d
      })
      for(var i = 0; i < usedQuestions.length; i ++ ){
        Archivum.questions.push({questionNumber:usedQuestions[i],clikedID:usedAnswers[i]});
      }

      Archivum.save(function(err){
        if(err) console.log(err);
        else {
          usedQuestions = [];
          usedAnswers = []; 
          res.render('quizend',{score: scoreTemp});
        }
      });
    }
  } else {
    res.redirect('/');
  }
});

router.post('/', function(req, res) {
  clickedAns = req.body.clickedAns;
  usedAnswers.push(clickedAns);
  if(req.body.correct=="true"){
    count++;
  }
  console.log(count);
});


module.exports = router;
