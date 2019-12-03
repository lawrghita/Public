const express = require("express");
const app = express();
const port = 3000;
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.send(`path in GET ${req.path} request`);
});

app.get('/fall/:objects',function (req,res) {
    var variable=req.params.objects;
    console.log(`fall obiect ${variable}`);
   // res.send(`fall obiect ${object}`);
    res.render("fall.ejs",{variable})

});

app.get('*',function (req, res) {
    res.render("home.ejs");
  //  res.send(`request path in GET: <p>   ${req.path}  </p> not defined in app`);
});
app.listen(port, function () {
  console.log(`app listening to ${port} `);
});