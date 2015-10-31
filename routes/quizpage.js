var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;

  var collection = db.get('quiz');
  collection.find({},{},function(e,docs){
      var questionNumber = Math.floor(Math.random()*docs.length);
      res.render('quizpage', { title: 'QUIZ', "questions" : docs[questionNumber] });
  });
});

router.post('/', function(req, res) {
  var db = req.db;
  
  var collection = db.get('quiz');
  collection.find({category: req.body.categories},{},function(e,docs){
      var questionNumber = Math.floor(Math.random()*docs.length);
      res.render('quizpage', { title: 'QUIZ', "questions" : docs[questionNumber] });
  });
});

module.exports = router;
