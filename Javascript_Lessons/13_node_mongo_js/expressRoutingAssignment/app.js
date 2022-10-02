const express = require("express");
const app = express();
const port = 3000;

app
    .get("/", function (req, res) {
        res.send("Hi there, welcome...!");
    })
    .get("/speak/:animal", function (req, res) {
        var sounds = {
            cow: "Moo",
            pig: "Oink",
            dog: "Woof",
            cat: "Miau",
            goldfish: "..00.."
        };
        let animal = req.params.animal.toLowerCase();
        let sound = sounds[animal];
        console.log(animal);
        if (sounds[animal] === undefined) {
            res.send(`The ${animal} says "???". `);
        } else {
            res.send(`The ${animal} says "${sound}"`);
        }
    })
    .get("/repeat/:word/:number", function (req, res) {

        let message = req.params.word;
        let number = req.params.number;
        console.log(message, number, parseInt(number));
        console.log(isNaN(number));
        var response = "";
        if ((number > 0) && !(isNaN(number))) {
            for (let index = 0; index < number; index++) {
                response += ` ${index}=` + message + " ";
            }
        } else {
            response = `"${number}" from ${req.path} not a positive number`;
        }
        res.send(response);
    })
    .get("*", function (req, res) {
        res.send("Sorry Page not found at " + req.path);
    });

app.listen(port, function () {
    console.log(`Example app listening on port number ${port}!`);
});
