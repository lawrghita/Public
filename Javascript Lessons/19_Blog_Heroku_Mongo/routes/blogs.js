var express = require("express");
var router = express.Router();

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
//createBlog();  // to fill the databasr

//just to see any operations done to database
Blog.watch({ fullDocument: "updateLookup" }).on(
  "change",
  function callBackChange(change) {
    console.log("updateLookup of Change :\n", change);
  }
);

/* GET home page for blogs route.   NOT /blogs - this route is defined outside in app */
// IP:3000/blogs
router.get("/", function (req, res, next) {
  console.log(__filename, "\n");

  // verify connection
  Blog.find({}, function (err, posts) {
    if (err) {
      console.log(err);
    } else {
      posts.forEach(function (post) {
        console.log(post.title);
      });

      res.render("blogs.ejs", { title: "Express Blogs 1Mongo", blogs: posts});
    }
  });
});

module.exports = router;

function createBlog() {
  Blog.create({
    title: "First post",
    image: "../images/favicon.ico",
    body: "text body",
    created: Date.now(),
  });
}
