var express = require('express');
var router = express.Router();
var quizQuestions = require('../videodata.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('quizpage', { title: 'QUIZ', questions:quizQuestions });
});

module.exports = router;
