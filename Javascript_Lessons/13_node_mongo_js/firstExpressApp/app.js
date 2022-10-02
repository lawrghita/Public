console.log("OUR EXPRESS server started at http://localhost:3000/");
var express = require("express");
var app = express();

app
  .get("/", function(req, res) {
    res.send("Hello World Express at http://localhost:3000/ x s");
  })
  .get("/bye", function(req, res) {
    console.log("bye call");
    res.send("Good bye dWorld Express");
  })
  .get("/dog", function(req, res) {
    console.log("dog call");
    res.send("MEOW cat");
  })
  .get("/r/:subReddit", function(req, res) {
   console.log(req);
   console.log("any route with just one word as parameter subREddit:",req.params);U
    res.send("subReddit");
  })
  .get("/r/:subReddit/comments/:id/:title/", function(req, res) {
    console.log("any route on that pattern",req.params.subReddit);
    res.send("Comments make on "+req.params.subReddit+" by "+req.params.id+" with title "+req.params.title);
  })
  .get("*", function (req, res) {
    console.log("* call from anything processable but execute just one send");
    res.send("Error 401 not other send defined to process this route & :parameters \'"+req.path+"\' till this message sent");
  })
  .listen(3000,function(){
    console.log("Server has started");
  });