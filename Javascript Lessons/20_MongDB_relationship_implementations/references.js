var mongoose = require("mongoose");

let uri = `mongodb://localhost/blog_relat`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);
//newPost();


// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]        // array of posts
});
var User = mongoose.model("User", userSchema);

//Find User
//fina all posts
// pupulate take all the posts and put in the user object
User.findOne({email:"Law@haoo.com"}).populate("posts").exec(function (err,user) {
    console.log(user);
});


/*
Post.create({
    title: "3. How to cook the",
    content: "3. ASfsa safdASDF afsDASdaaf fasf"
}, function (err, postCreated) {
    User.findOne({email: "Law@haoo.com"}, function (err, foundUser) {
        foundUser.posts.push(postCreated);
        foundUser.save(function (err, data) {
            console.log(data);
        });
    });
});
*/

//newUser();
/*User.create({
    email: "Bold@haoo.com",
    name: "Bolon Laurgu"
});
console.log(User);*/


/*
User.findOne({name:"Brown"}, function callBackUserFindOne(err, user) {
    if (err) {
        console.log(err);
    } else {
        user.posts.push({title:"Second post",
            content:"Content for 2 post"
        });
        user.save(function (err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log(user, user.posts.toString());
            }
        });
   }
});
*/


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

