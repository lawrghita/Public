const express = require("express");
const app = express();
const port = 3000;

app
  .get("/", function(req, res) {
    res.send("Hi there, welcome...!");
  })
  .get("/speak/:animal", function(req, res) {
    console.log(req.params.animal);
    switch (req.params.animal) {
      case "cow":
        res.send("The " + req.params.animal + " says 'Moo'");
        break;
      case "pig":
        res.send("The " + req.params.animal + " says 'Oink'");
        break;
      case "dog":
        res.send("The " + req.params.animal + " says 'Woof'");
        break;
      default:
        res.send("The " + req.params.animal + " says '???'");
        break;
    }
  })
  .get("/repeat/:word/:number", function(req, res) {
    console.log(req.params.word,req.params.number);
    var response="";
    for (let index = 0; index < req.params.number; index++) {
      response += req.params.word+" "+index;
    }
    res.send(response); 
  })
  .get("*", function(req, res) {
    res.send("Sorry Page not found at " + req.path);
  });

app.listen(port, function() {
  console.log(`Example app listening on port number ${port}!`);
});
