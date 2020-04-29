// this use both databases inside one, posts are embedded in users base

var mongoose = require("mongoose");

let uri = `mongodb://localhost/blog_demo`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// POST - title, content defined before the user because this must be declared before the use
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
    posts: [postSchema]        // array of posts
});
var User = mongoose.model("User", userSchema);
//newUser();

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




/////////////////////////////////
function newUser() {
    var newUser = new User({
        email: "charlie@yahoo.com",
        name: "Brown"
    });

    newUser.posts.push({
        title:"Persona post",
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

