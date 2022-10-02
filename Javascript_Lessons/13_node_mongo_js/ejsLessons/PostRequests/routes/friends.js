var express = require('express');
var router = express.Router();

/* GET users listing. */
var friends = ["Tony", "Rada", "Mada", "Kaky"];

router.get('/', function(req, res, next) {
  res.render('friends', { friendsTOejs: friends });
});
router.post('/addfriend', function(req, res, next) {     //triggered just  by the POST form
    //res.send("You add a friend "+req.body.namefriend);
    console.log(req.body);
    console.log("You add a friend "+req.body.namefriend+" after "+friends);
    var nameadd=req.body.namefriend;
    friends.push(nameadd);
    //res.locals.friendsTOejs = friends;  //or
    //res.render('friends',{friendsTOejs: friends});  //or
    res.redirect('/friends');
});

module.exports = router;
