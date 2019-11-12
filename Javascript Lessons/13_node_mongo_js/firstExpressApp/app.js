console.log("OUR EXPRESS");
var express = require("express");
var app = express();

app
  .get("/", function(req, res) {
    res.send("Hello World Express");
  })
  .get("/bye", function(req, res) {
    res.send("Good bye dWorld Express");
  })
  .get("/dog", function(req, res) {
    res.send("MEOW dcat");
  })
  .listen(3000);
