var express = require("express");
var router = express.Router();

("use strict");
require("dotenv").config();
var mongoose = require("mongoose");

const utilizator = process.env["UTILIZATOR"];
const parola = process.env["PAROLA"];
const mydatabase = "blogherokumongo";

let uri = `mongodb+srv://${utilizator}:${parola}@cluster0-8s7vx.gcp.mongodb.net/${mydatabase}?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
});
var Blog = mongoose.model("Blog", blogSchema);
//createBlog();  // to fill the database

//just to see any operations done to database
Blog.watch({fullDocument: "updateLookup"}).on(
    "change",
    function callBackChange(change) {
        console.log("updateLookup of Change :\n", change);
    }
);

//  REST ROUTES on /gallery:
//  name       url              route VERB        description
//  =============================================
//  INDEX   /blogs or /       GET     display all
//  NEW     /blogs/ne         GET     form to interrogate for a new blog post
//  CREATE  /blogs            POST    add a new well in database
//  SHOW    /blogs/:id        GET     show info about one element in database


/* GET home page for blogs route.   NOT /blogs - this route is defined outside in app */
// IP:3000/blogs
///////////////////////////////////////////////////////////
// INDEX ROUTE display all
router.get("/", function (req, res, next) {
    console.log(__filename, "\n");
    // verify connection
    Blog.find({}, null, {sort: {created: "descending"}}, function (err, posts) {
        if (err) {
            console.log(err);
        } else {
            posts.forEach(function (post) {
                console.log(post.title);
            });
            res.render("blogs.ejs", {title: "Express Blogs Mongo", blogs: posts});
        }
    });
});
/////////////////////////////////////////////////////////////////////
// NEW ROUTE /blogs/new
router.get("/new", function callbackNew(request, result) {
    result.render("new.ejs", {title: "New Post"})
});
////////////////////////////////////////////////////////////////////
//  CREATE  /blogs            POST    add a new well in database
router.post("/", function callbackPost(request, result) {
        // create blog
        // title: "First post",
        // image: "/images/favicon.ico",
        // body: "text body",

        var dataFromPost = {
            title: request.body['blog[title]'],
            image: request.body['blog[image]'],
            body: request.body['blog[body]']
        };

        //// normal is just:
        //// Blog.create(dataFromPost, function (err, newBLog) {result.redirect("/blogs");});
        /////// but if is in public domain (production) I must
        /////// temporary deleting the oldest post so the database is not filled by bots
        /// and also put a wait timer for 4 seconds to slow the submit speed click exploit
        ////.... the display is refreshed before redirect
        setTimeout(function(){
            Blog.create(dataFromPost, function (err, newBLog) {
                if (err) {
                    console.log(err);
                } else {
                    deleteOldestPostAndRedirect(result);
                }
            });
        }, 4000);
    }
);


module.exports = router;

////////// garbage //////////////////////////////////
function createBlog() {
    Blog.create({
        title: "First post",
        image: "/images/favicon.ico",
        body: "text body",
        created: Date.now(),
    });
}

///////////////
function deleteOldestPostAndRedirect(result) {
    Blog.findOneAndRemove({},{sort: {'created_at': 1}}, function(err, post) {
        if(!err){
            console.log( "Deleted:", post.title );
            //redirect
            result.redirect("/blogs");
        } else {
            console.log( "Deleted error:", err );
        }
    });
}