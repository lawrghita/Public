console.log("App userfirstnowe", userFirstNow);
var express = require("express");
var router = express.Router();

//used to close forgotten end tags on posts so do not flow the styles in subsequent posts
const dateAfterDelete = new Date (2020, 4-1, 23, 12+3, 30,30);
const closedTAGs="</p></h1></h2></h3></h4></h5></h6></a></img></pre></blockquote></i></b></tt></em></strong></tt></cite></ol></ul></li></dl></table></tr></td>";
const welcomeMESSAGE = 'Bot protection: All your posts are deleted on new connection & 4 seconds timeout on new post. Html accepted on post body. Perfect mobile & navigation.'

const expressSanitizer = require('express-sanitizer');
router.use(expressSanitizer());

//// random area fillers
const loremIpsum = require("lorem-ipsum").loremIpsum;
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 4,
        min: 2
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
const coolImages = require("cool-images");

("use strict");
require("dotenv").config();

var mongoose = require("mongoose");
const utilizator = process.env["UTILIZATOR"];
const parola = process.env["PAROLA"];
const mydatabase = "blogherokumongo";
let uri = `mongodb+srv://${utilizator}:${parola}@cluster0-8s7vx.gcp.mongodb.net/${mydatabase}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now },
});
var Blog = mongoose.model("Blog", blogSchema);
//createBlog();  // to fill the database

//just to see any operations done to database
Blog.watch({ fullDocument: "updateLookup" }).on(
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
router.get("/", function(req, res, next) {
    console.log(__filename, "\n", welcomeMESSAGE);
    // verify connection , show the post with the newest on top
    Blog.deleteMany({ $and:  [{created: {$lte: userFirstNow }},{created: {$gte: dateAfterDelete }}] }, function callBackAfterDeletion() {
   //     console.log("Date comparision", Date.now(),  dateAfterDelete);
    });
    Blog.find({}, null, { sort: { created: "descending" } }, function(err, posts) {
        if (err) {
            console.log(err);
        } else {
             posts.forEach(function (post) {
                 post.body=post.body.slice(0, 400)+"..."+closedTAGs;
                // console.log("For Each:", post.body);
                 console.log("For Created:", userFirstNow, post.created, dateAfterDelete);
             });

            res.render("blogs.ejs", { title: "Express Blogs Mongo", welcomeMESSAGE: welcomeMESSAGE, blogs: posts });
        }
    });
});
/////////////////////////////////////////////////////////////////////
// NEW ROUTE /blogs/new
router.get("/new", function callbackNew(request, result) {
    // Put some random value to see exactly the use of space
    const title = loremIpsum();
    const image = coolImages.one(); // 'https://unsplash.it/300/500?image=125'
    const body = lorem.generateParagraphs(3);
    result.render("new.ejs", { title: title, image: image, body: body})
});
////////////////////////////////////////////////////////////////////
//  CREATE  /blogs            POST    add a new well in database
router.post("/", function callbackPost(request, result) {
    const sanitizedBody =request.sanitize(request.body['blog[body]']);
    console.log("Sanitize NEW: \n",sanitizedBody);

    var dataFromPost = {
        title: request.body['blog[title]'],
        image: request.body['blog[image]'],
        body: sanitizedBody
    };
    //// normal is just:
    //// Blog.create(dataFromPost, function (err, newBLog) {result.redirect("/blogs");});
    /////// but if is in public domain (production) I must
    /////// temporary deleting the oldest post so the database is not filled by bots
    /// and also put a wait timer for 4 seconds to slow the submit speed click exploit
    ////.... the display is refreshed before redirect
    setTimeout(function() {
        Blog.create(dataFromPost, function(err, newBLog) {
            if (err) {
                console.log(err);
            } else {
                result.redirect("/blogs");
                //deleteOldestPostAndRedirect(result);
            }
        });
    }, 4000);
});

//  SHOW    /blogs/:id        GET     show info about one element in database
router.get("/:id", function callBackID(request, result) {
    console.log(request.params.id);
    Blog.findOne({ _id: request.params.id }, null, {}, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            console.log("Show: \n", blog._id, blog.title, blog.image, blog.body);
            const sanitizedBody = request.sanitize(blog.body);
            console.log("Sanitize: \n",sanitizedBody);
                result.render("show.ejs", { id: blog._id , title: blog.title, image: blog.image, body: sanitizedBody , created: blog.created  });

        }
    });
    //result.status("200").send("request.params: "+request.params.id);

});



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
    Blog.findOneAndRemove({}, { sort: { 'created_at': 1 } }, function(err, post) {
        if (!err) {
            console.log("Deleted:", post.title);
            //redirect
            result.redirect("/blogs");
        } else {
            console.log("Deleted error:", err);
        }
    });
}