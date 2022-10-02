var mongoose = require("mongoose");

let uri = `mongodb://localhost/blog_relat`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var Post = require("./models/posts");
var User = require("./models/users");


//Find User
//fina all posts
// populate take all the posts and put in the user object
User.findOne({ email: "Law@haoo.com" }).populate("posts").exec(function(err, user) {
    //   console.log(user);
});

User.create({
    email: "Law@haoo.com",
    name: "Bsdsolon Laurgu"
});
console.log(User);
Post.create({
    title: "1. How to cook the",
    content: "2. ASfsa safdASDF afsDASdaaf fasf"
}, function(err, postCreated) {
    User.findOne({ email: "Law@haoo.com" }, function(err, foundUser) {
        foundUser.posts.push(postCreated);
        foundUser.save(function(err, data) {
            console.log(data);
        });
    });
});


//newUser();
User.create({
    email: "Bold@haoo.com",
    name: "Bolon Laurgu"
});
console.log(User);

Post.findOne({
    _id: "5ea9b609dac1041368e748e0"
}, function(err, postfounded) {
    User.findOne({ email: "Bold@haoo.com" }, function(err, foundUser) {
        foundUser.posts.push(postfounded);
        foundUser.save(function(err, data) {
            console.log(data);
        });
    });
});




User.findOne({ email: "Bold@haoo.com" }, function callBackUserFindOne(err, user) {
    if (err) {
        console.log(err);
    } else {
        user.populate("posts");
        console.log(user, "Bolon", user.posts.toString());
    }
});


/////////////////////////////////
function newUser() {
    var newUser = new User({
        email: "charlie@yahoo.com",
        name: "Brown"
    });

    newUser.posts.push({
        title: "Persona post",
        content: "Body test sdfsdfsd !"
    });

    newUser.save(function callbackUserSave(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
        }
    });
}

function newPost() {
    var newPost = new Post({
        title: "Post now",
        content: "asdsad adsad"
    });

    newPost.save(function callbackPostSave(err, post) {
        if (err) {
            console.log(err);
        } else {
            console.log(post);
        }
    });

}