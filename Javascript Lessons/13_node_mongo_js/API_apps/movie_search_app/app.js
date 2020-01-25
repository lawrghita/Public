var request = require("request");
const express = require('express');
const app = express();
const vURI = "http://www.omdbapi.com/?s=california&apikey=thewdb";
app.set("view engine", "ejs");

app.get('/', function (req, res) {
    request(vURI, function callback(error, response, body) {
        res.render("results");
        const parsedData = JSON.parse(body);
        const poster= `<img src="${parsedData.Search[1].Poster}" alt="talian s Trulli">`;
        if(!error && response.statusCode == 200){
            console.log("Title call type 1:",parsedData.Search[2].Title);
            console.log("Title call type 2:",parsedData["Search"][2]["Title"]);
            console.log(poster);
            //res.send(poster);
            res.render("results",{data: parsedData});
        }
        else {
            res.send(parsedData);
        }
    });
});



app.listen(3000, function listenconfirmation(req,result) {
    console.log('Listen localhost:3000');
});





