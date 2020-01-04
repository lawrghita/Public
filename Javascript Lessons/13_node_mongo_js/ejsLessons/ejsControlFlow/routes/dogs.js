var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dog', { thingVar: 'a dog name please a' });
});
router.get('/:name', function(req, res, next) {
    res.render('dog', { thingVar: req.params.name });

});

module.exports = router;
