var express = require('express');
var router = express.Router();


'use strict';
require('dotenv').config();
var mongoose = require("mongoose");

const utilizator = process.env['UTILIZATOR'];
const parola = process.env['PAROLA'];
const mydatabase = "blogherokumongo";

let uri = `mongodb+srv://${utilizator}:${parola}@cluster0-8s7vx.gcp.mongodb.net/${mydatabase}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created:{type: Date, default: Date.now}
}); 
var Blog =mongoose.model("Blog", blogSchema);
createBlog();
console.log(Blog.findOne());

/* GET home page for blogs route.   NOT /blogs - this route is defined outside in app */
router.get('/', function (req, res, next) {
  console.log(req.params.path);
  res.render('blogs.ejs', { title: 'Express Blogs Mongo' });
});




module.exports = router;


function createBlog(){
  Blog.create({
    title:"First post",
    image:"Image post",
    body:"text body",
    created: Date.now()
  })
}