var express = require('express');
var router = express.Router();
var shuffle = require('../public/javascripts/function');
var models = require('../config/models');
var utils = require('../config/utils');
var count = 0;
var questionCounter = 0;
var usedQuestions = [];
var usedAnswers = [];
var questionNumber;
var clickedAns;

/* GET Quiz page. */
router.get('/', utils.requireLogin, function(req, res, next) {
  if(questionCounter != 5){
    models.QuizQestionModel.find({},function(e,docs){
        do {
          questionNumber = Math.floor(Math.random()*docs.length);
        } while (utils.isQuestionRepeat(questionNumber,usedQuestions));
        res.render('quizpage', { title: 'QUIZ', "questions" : docs[questionNumber], func: shuffle });
    });
  } else {
    var scoreTemp = count;
    var d = new Date()
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var hours = d.getHours();
    var minutes = (d.getMinutes()<10?'0':'') + d.getMinutes()

    // Creating archive file
    var Archivum = new models.ArchModel({
      player: req.user.name,
      questions: [],
      score: scoreTemp,
      date: day + "." + month + "." + year + " " + hours + ":" + minutes
    })
    for(var i = 0; i < usedQuestions.length; i ++ ){
      Archivum.questions.push({questionNumber:usedQuestions[i],clikedID:usedAnswers[i]});
    }

    Archivum.save(function(err){
      if(err) console.log(err);
      else {
        questionCounter = 0;
        count = 0;
        usedQuestions = [];
        usedAnswers = [];
        res.render('quizend',{score: scoreTemp});
      }
    });
  }
});

router.post('/', utils.requireLogin, function(req, res) {
  clickedAns = req.body.clickedAns;
  usedAnswers.push(clickedAns);
  usedQuestions.push(questionNumber);
  questionCounter++;
  console.log(questionCounter);
  if(req.body.correct=="true"){
    count++;
  }
});


module.exports = router;
