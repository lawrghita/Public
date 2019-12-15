const express = require("express");
const app = express();
const port = 3000;
const style = '/fall/:objects';
app.use(express.static('public'));  //define location for public static files
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.send(`path in GET ${req.path} request must be ${style}`);
});

app.get(style,function (req,res) {
    var variable=req.params.objects;
    var vpath = req.path.toString();
  //  console.log(`${variable}  `, vpath);
  //  console.log(`fall obiect ${variable}`);
   // res.send(`fall obiect ${object}`);
    res.render("fall.ejs",{variable, path: vpath}) //{object} with variables as parameters to .ejs render file}
});

app.get('*',function (req, res) {
    res.render("home.ejs",{variableToUseinEJSfile: style});
  //  res.send(`request path in GET: <p>   ${req.path}  </p> not defined in app`);
});
app.listen(port, function () {
  console.log(`app listening to ${port} `);
});