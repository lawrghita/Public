var userFirstNow = new Date(0);
console.log("App userFirstEntryOnServer Empty", userFirstNow.toUTCString());
var express = require("express");
var router = express.Router();

//used to close forgotten end tags on posts so do not flow the styles in subsequent posts
const closedTAGs = "</p></h1></h2></h3></h4></h5></h6></a></img></pre></blockquote></i></u></b></tt></em></strong></tt></cite></ol></ul></li></dl></table></tr></td>";

// fixed date to keep my old posts
const dateAfterDelete = new Date(2020, 4 - 1, 23, 12 + 3, 30, 30);
let welcomeMESSAGE = "Bot protection: 4 seconds pause on new posts, your posts are deleted after 5 min. <p> Html accepted on post body. Perfect mobile & navigation.";


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
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()},
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
    //  console.log(__filename, "\n", welcomeMESSAGE);
    // verify connection , show the post with the newest on top
    Blog.deleteMany({$and: [{created: {$lte: userFirstNow}}, {created: {$gte: dateAfterDelete}}]}, function callBackAfterDeletion() {
        //  console.log("Date comparision", Date.now(),  dateAfterDelete);
    });
    Blog.find({}, null, {sort: {created: "descending"}}, function (err, posts) {
        if (err) {
            console.log(err);
        } else {
            posts.forEach(function (post) {
                // cleaning the post <div>s   and closing eventually open HTML TAGs
                const regex = /<div>|<\/div>/gm;
                post.body = post.body.slice(0, 400).replace(regex,'') + "..." + closedTAGs;
                //  console.log("For Each:", post.body);
                //  console.log("For Created:", userFirstNow, post.created, dateAfterDelete);
            });

            res.render("blogs.ejs", {title: "Express Blogs Mongo", blogs: posts});
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
    setTimeout(function () {
    result.render("new.ejs", {title: title, welcomeMESSAGE: welcomeMESSAGE, image: image, body: body})
    }, 4000);
});
////////////////////////////////////////////////////////////////////
//  CREATE  /blogs            POST    add a new well in database
router.post("/", function callbackPost(request, result) {

        const sanitizedBody = request.sanitize(request.body['blog[body]']);
        // console.log("Sanitize NEW: \n", sanitizedBody);
        var dataFromPost = {
            title: request.body['blog[title]'],
            image: request.body['blog[image]'],
            body: sanitizedBody,
            created: Date.now()
        };


        //// normal is just:
        //// Blog.create(dataFromPost, function (err, newBLog) {result.redirect("/blogs");});
        /////// but if is in public domain (production) I must
        /////// temporary deleting the oldest post so the database is not filled by bots
        /// and also put a wait timer for 4 seconds to slow the submit speed click exploit
        ////.... the display is refreshed before redirect

        Blog.create(dataFromPost, function (err, newBLog) {
            if (err) {
                console.log("Eroare", err);
            } else {
               // Memorize first post and delete everything from 5 minutes before till my  "Veniam magna... " post
               // console.log("App userFirstEntryOnServerX", userFirstNow, userFirstNow.toString().slice(0,15));
               // if (userFirstNow.toString().slice(0,15) === 'Thu Jan 01 1970') {
                    userFirstNow = newBLog.created;
                    userFirstNow.setMinutes(userFirstNow.getMinutes() - 5);
                  //  console.log("App userFirstEntryOnServerD", userFirstNow, Date(0), userFirstNow.toString(), userFirstNow.toUTCString());
                    welcomeMESSAGE = "Bot protection: 4 seconds pause on new posts, your posts are deleted after 5 min. <p> Html accepted on post body. Perfect mobile & navigation." + " <p> Delete between (" + userFirstNow.toUTCString().slice(0,25) + " and " + dateAfterDelete.toUTCString().slice(0,25) + ")";
               // }
                result.redirect("/blogs");
                //deleteOldestPostAndRedirect(result);
            }
        });

});

//  SHOW    /blogs/:id        GET     show info about one element in database
router.get("/:id", function callBackID(request, result) {
    console.log(request.params.id);
    Blog.findOne({_id: request.params.id}, null, {}, function (err, blog) {
        if (err) {
            console.log(err);
        } else {
           // console.log("Show: \n", blog._id, blog.title, blog.image, blog.body);
            const sanitizedBody = request.sanitize(blog.body);
            //  console.log("Sanitize: \n", sanitizedBody);
            result.render("show.ejs", {
                id: blog._id,
                title: blog.title,
                image: blog.image,
                body: sanitizedBody,
                created: blog.created
            });

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
    Blog.findOneAndRemove({}, {sort: {'created_at': 1}}, function (err, post) {
        if (!err) {
            console.log("Deleted:", post.title);
            //redirect
            result.redirect("/blogs");
        } else {
            console.log("Deleted error:", err);
        }
    });
}