var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    var posts =[
        {title: "Post 1", author: "Suzzy"},
        {title: "Post 2", author: "uzzy"},
        {title: "Post 3", author: "cuzzy"},
        {title: "Post 4", author: "ccuzzy"}
    ];
  res.render('post.ejs', {postsToEJS: posts});
});


module.exports = router;
