console.log("OUR EXPRESS");
var express = require("express");
var app = express();

app
  .get("/", function(req, res) {
    res.send("Hello World Express");
  })
  .get("/bye", function(req, res) {
    console.log("bye call");
    res.send("Good bye dWorld Express");
  })
  .get("/dog", function(req, res) {
    console.log("dog call");
    res.send("MEOW cat");
  })
  .listen(3000,function(){
    console.log("Server has started");
  });