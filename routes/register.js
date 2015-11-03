var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var mongoose = require('mongoose');
var modelsDB = require('../public/javascripts/modelsDB');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kluza13@gmail.com',
        pass: 'umpalumpa13'
    }
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register'});
});

router.post('/', function(req, res) {
  //Errors
  var error = [];
  if(!req.body.pass || !req.body.username || !req.body.email || !req.body.passRepeat){
    error.push('All fields required');
  }
  if(req.body.pass != req.body.passRepeat){
    error.push('Passwords do not match');
  }
  if(error.length != 0){
    res.render('register', { title: 'Register', errorArray: error});
  } else {
    //hashing password
    var password = crypto.createHash('md5').update(req.body.pass).digest("hex");

    // Submit to the DB
    var user = new modelsDB.UserModel({
        "name": req.body.username,
        "email": req.body.email,
        "password": password,
        "active": "0"
    })
    user.save(function (err) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            transporter.sendMail({
              from: 'kluza13@gmail.com',
              to: req.body.email,
              subject: 'Thanks for register',
              text: 'Welcome in quizify '+ req.body.username + " !"
            },function(err,docs){
              if(err) console.log(err)
            });
            res.redirect("/");
        }
    });
  }
});

module.exports = router;
