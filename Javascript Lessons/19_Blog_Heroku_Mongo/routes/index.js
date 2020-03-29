var express = require('express');
var router = express.Router();


'use strict';
require('dotenv').config();
var mongoose = require("mongoose");

const utilizator = process.env['UTILIZATOR'];
const parola = process.env['PAROLA'];
const mydatabase="blogherokumongo";  

let uri = `mongodb+srv://${utilizator}:${parola}@cluster0-8s7vx.gcp.mongodb.net/${mydatabase}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String
});





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Mongo' });
});




module.exports = router;
