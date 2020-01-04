var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    var posts =[
        {title: "Post 1 Mamamia", author: "Suzzy"},
        {title: "Post 2 REctor", author: "Buzzy"},
        {title: "Post 3 Vannila", author: "Rcuzzy"},
        {title: "Post 4 Source", author: "Cuzzy"}
    ];
  //res.render('post.ejs', {postsToEJS: posts[1].title+":"+posts[1].author});
    res.render('post.ejs', {postsToEJS: posts});
});


module.exports = router;
