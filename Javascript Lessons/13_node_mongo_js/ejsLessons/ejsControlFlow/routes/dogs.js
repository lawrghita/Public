var express = require('express');
var router = express.Router();
const style = '/fall/:objects';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('love', { thingVar: 'Love' });
});
router.get('/:name', function(req, res, next) {
    res.render('love', { thingVar: req.params.name });

});

module.exports = router;
