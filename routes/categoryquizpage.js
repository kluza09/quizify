var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;

  var collection = db.get('quiz');
  collection.find({category:"polityka"},{},function(e,docs){
      var questionNumber = Math.floor(Math.random()*docs.length);
      res.render('quizpage', { title: 'QUIZ', "questions" : docs[questionNumber] });
  });
});

module.exports = router;
