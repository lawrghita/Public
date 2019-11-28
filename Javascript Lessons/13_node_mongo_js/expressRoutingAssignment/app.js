const express = require("express");
const app = express();
const port = 3000;

app
  .get("/", function(req, res) {
    res.send("Hi there, welcome...!");
  })
  .get("/speak/:animal", function(req, res) {
    let animal = req.params.animal;
    console.log(animal);
    switch (animal) {
      case "cow":
        res.send("The " + animal + " says 'Moo'");
        break;
      case "pig":
        res.send("The " + animal + " says 'Oink'");
        break;
      case "dog":
        res.send("The " + animal + " says 'Woof'");
        break;
      default:
        res.send("The " + animal + " says '???'");
        break;
    }
  })
  .get("/repeat/:word/:number", function(req, res) {

    let message = req.params.word;
    let number = req.params.number;
    console.log(message,number);
    var response="";
    if (number>0 && number.isNumeric()) {
    for (let index = 0; index < number; index++) {response += ` ${index}=`+message+" ";}
    } else {
      res.send(`"${number}" from ${req.path} not a positive number`)
    }
    res.send(response);
  })
  .get("*", function(req, res) {
    res.send("Sorry Page not found at " + req.path);
  });

app.listen(port, function() {
  console.log(`Example app listening on port number ${port}!`);
});
