var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/blogs');
 // res.render('index.ejs', { title: 'Express Index Mongo' });
});

module.exports = router;
