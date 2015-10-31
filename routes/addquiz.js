var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addquiz', { title: 'ADD QUIZ QUESTIONS'});
});

router.post('/', function(req, res) {
  /* Error handling */

  var error = [];
  if(req.body.contentQ.length == 0 || req.body.corAns.length == 0 || req.body.incorAns1.length == 0 || req.body.incorAns2.length == 0 || req.body.incorAns3.length == 0 ){
    error.push('All fields required');
  }
  if(req.body.contentQ.length >= 25) {
    error.push('Question is too long');
  }
  if(error.length != 0){
    console.log(error);
    res.render('addquiz', { title: 'ADD QUIZ QUESTIONS', errorArray: error});
  } else {
    var db = req.db;

    // Set our collection
    var quiz = db.get('quiz');

    // Submit to the DB
    quiz.insert({
        "questionContent": req.body.contentQ,
        "answer":[
          {"id":"1","answerContent":req.body.corAns},
          {"id":"2","answerContent":req.body.incorAns1},
          {"id":"3","answerContent":req.body.incorAns2},
          {"id":"4","answerContent":req.body.incorAns3}
        ],
        "correctID": "1"
    }, function (err, doc) {
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
