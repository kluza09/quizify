var express = require('express');
var router = express.Router();
var models = require('../config/models');
var utils = require('../config/utils');

/* GET home page. */
router.get('/', utils.requireLogin, function(req, res, next) {
  res.render('addquiz', { title: 'Add Quiz Questions',csrfToken: req.csrfToken()});
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
    var newQ = new models.QuizQestionModel({
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
            res.redirect("/userpage");
        }
    });
  }
});

module.exports = router;
