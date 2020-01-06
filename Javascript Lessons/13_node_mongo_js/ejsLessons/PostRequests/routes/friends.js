var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var friends = ["Tony", "Rada", "Mada", "Kaky"];
  res.render('friends', { friendsTOejs: friends });
});

module.exports = router;
