var request = require("request");
const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.get("/",function callBackSearch(req, res) {
    res.render("search.ejs");
});

app.get('/results', function callBackPosters(req, res) {
    vsearchthis=req.query.searchthis;
    vURI="http://www.omdbapi.com/?s="+vsearchthis+"&apikey=thewdb"
    console.log(vURI);
    request(vURI, function callback(error, response, body) {
        const parsedData = JSON.parse(body);
        console.log('!error',!error);
        console.log('response.statusCode == 200',(response.statusCode == 200));
        console.log('parsedData["Response"]',parsedData["Response"] == "True");
        if(!error && response.statusCode == 200 && (parsedData["Response"] == "True")){
            console.log((!error && response.statusCode == 200 && (parsedData["Response"] == "True")));
            res.render("results.ejs",{data: parsedData});
        }
        else {
            parsedData["Error"]+=" "+vsearchthis;
            res.send(parsedData);
        }
    });
});

app.listen(3000, function listenconfirmation(req,result) {
    console.log('Listen localhost:3000');
});





