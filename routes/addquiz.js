var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongoose = require('mongoose');
var modelsDB = require('../public/javascripts/modelsDB');
var auth = require('../public/javascripts/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(auth.isLogged()){
    res.render('addquiz', { title: 'Add Quiz Questions'});
  } else {
    res.redirect('/');
  }
});

router.post('/', function(req, res) {
  //Errors
  var error = [];
  if(!req.body.contentQ|| !req.body.categoryQ || !req.body.corAns || !req.body.incorAns1 || !req.body.incorAns2 || !req.body.incorAns3 ){
    error.push('All fields required');
  }
  if(req.body.contentQ.length >= 100) {
    error.push('Question is too long');
  }
  if(error.length != 0){
    res.render('addquiz', { title: 'ADD QUIZ QUESTIONS', errorArray: error});
  } else {
    var newQ = new modelsDB.QuizQestionModel({
      category:req.body.categoryQ,
      questionContent:req.body.contentQ,
      answer:[{id:"1",answerContent:req.body.corAns},
              {id:"2",answerContent:req.body.incorAns1},
              {id:"3",answerContent:req.body.incorAns2},
              {id:"4",answerContent:req.body.incorAns3}],
      correctID:"1"
    });
    newQ.save(function (err){
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/");
        }
    });
  }
});

module.exports = router;
