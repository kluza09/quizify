var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  if (req.session) {
    req.session.reset();
  }
  res.redirect('/');
});

module.exports = router;
