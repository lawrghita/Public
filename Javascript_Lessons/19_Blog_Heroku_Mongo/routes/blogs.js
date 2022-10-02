//  REST ROUTES on /gallery:
//  name       url              route VERB        description
//  =============================================
//  INDEX   /blogs or /       GET     display all
//  NEW     /blogs/ne         GET     form to interrogate for a new blog post
//  CREATE  /blogs            POST    add a new well in database
//  SHOW    /blogs/:id        GET     show info about one element in database
//  EDIT    /blogs/:id/edit   GET     show edit form for one post
// UPDATE   /blogs/:id        PUT   Update a post with a particularly id
// DELETE   /blogs/:id      DELETE  Delete a post with id


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


/* GET home page for blogs route.   NOT /blogs - this route is defined outside in app */
// IP:3000/blogs
///////////////////////////////////////////////////////////
// INDEX ROUTE display all
router.get("/", function (req, res, next) {
    //  console.log(__filename, "\n", welcomeMESSAGE);
    // verify connection , show the post with the newest on top

    // Memorize first post and delete everything from 5 minutes before till my  "Veniam magna... " post
    // console.log("App userFirstEntryOnServerX", userFirstNow, userFirstNow.toString().slice(0,15));
    if (userFirstNow.toString().slice(0, 15) !== 'Thu Jan 01 1970') {
        Blog.deleteMany({$and: [{created: {$lte: userFirstNow}}, {created: {$gte: dateAfterDelete}}]}, function callBackAfterDeletion() {
            //  console.log("Date comparision", Date.now(),  dateAfterDelete);
        });
    }

    Blog.find({}, null, {sort: {created: "descending"}}, function (err, posts) {
        if (err) {
            console.log(err);
        } else {
            posts.forEach(function (post) {
                // cleaning the post <div>s   and closing eventually open HTML TAGs
                //  post.body = post.body.slice(0, 400).replace(regex, '') + "..." + closedTAGs;  // BECAUSE ERROR TypeError: Cannot read property 'slice' of undefined  at C:\Users\Ghita\WebstormProjects\Public\Javascript Lessons\19_Blog_Heroku_Mongo\routes\blogs.js:95:39
                // console.log("For Each:", post.body);
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
    /// and also put a wait timer for 4 seconds to slow the submit speed click exploit
    setTimeout(function () {
        if (userFirstNow.toString().slice(0, 15) !== 'Thu Jan 01 1970') {
        welcomeMESSAGE = "2022: Bot protection: 4 seconds pause on new posts, your posts are deleted after 5 min. <p> Html accepted on post body. Perfect mobile & navigation." + " <p> Delete between (" + userFirstNow.toUTCString().slice(0, 25) + " and " + dateAfterDelete.toUTCString().slice(0, 25) + ")";
        }else{
            welcomeMESSAGE = "Bot protection: 4 seconds pause on new posts, your posts are deleted after 5 min. <p> Html accepted on post body. Perfect mobile & navigation.";
        }
        result.render("new.ejs", {title: title, welcomeMESSAGE: welcomeMESSAGE, image: image, body: body})
    }, 1000);
});
////////////////////////////////////////////////////////////////////
//  CREATE  /blogs            POST    add a new post in database
router.post("/", function callbackPost(request, result) {
    // 'blog[body]'  is the name of the DOM
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

    ////.... the display is refreshed before redirect
    Blog.create(dataFromPost, function (err, newBLog) {
        if (err) {
            console.log("Eroare", err);
        } else {

            userFirstNow = newBLog.created;
            userFirstNow.setMinutes(userFirstNow.getMinutes() - 5);
            //  console.log("App userFirstEntryOnServerD", userFirstNow, Date(0), userFirstNow.toString(), userFirstNow.toUTCString());

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

//  EDIT    /blogs/:id/edit   GET     show edit form for one post
router.get("/:id/edit", function callBackID(request, response) {
    console.log(request.params.id);
    Blog.findOne({_id: request.params.id}, null, {}, function (err, foundedBlog) {
        if (err) {
            console.log(err);
            response.redirect("/");
        } else {
            const title = foundedBlog.title;
            const image = foundedBlog.image;
            const body = foundedBlog.body;
            welcomeMESSAGE = "Edit post ";
            response.render("edit.ejs", {
                id: request.params.id,
                title: title,
                image: image,
                body: body,
                welcomeMESSAGE: welcomeMESSAGE
            });
        }
    });
});

// UPDATE   /blogs/:id        PUT   Update a post with a particularly id
router.put("/:id", function callbackPost(request, result) {
    // it can be easy by using code same as in delete REST
    // 'blog[body]'  is the name of the DOM
    const sanitizedBody = request.sanitize(request.body['blog[body]']);
    // console.log("Sanitize NEW: \n", sanitizedBody);
    title = request.body['blog[title]'];
    image = request.body['blog[image]'];
    body = sanitizedBody;

    Blog.findOne({_id: request.params.id}, null, {}, function (err, updatedBlog) {
        if (err) {
            console.log(err);
            result.redirect("/");
        } else {
            updatedBlog.title = "*" + title;
            updatedBlog.image = image;
            //const edited = new Date();
            updatedBlog.body = body;    //+ "<hr><i><footer>Edited in "+ edited.toLocaleString();+"</footer></i>";
            updatedBlog.save();
            result.redirect("/blogs/" + request.params.id);
        }
    });


});

// DELETE   /blogs/:id      DELETE  Delete a post with id
router.delete("/:id", function callbackPost(request, result) {
// delete just the new one after the dateAfterDelete
    Blog.deleteOne({$and: [{_id: request.params.id}, {created: {$lte: Date.now()}}, {created: {$gte: dateAfterDelete}}]}, function callBackAfterDeletion(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted",request.params.id);
        }
        result.redirect("/");
    });
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