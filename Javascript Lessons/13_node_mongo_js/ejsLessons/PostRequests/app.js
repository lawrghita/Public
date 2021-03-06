var createError = require('http-errors');
var express = require('express');         //1
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var homeRouter = require('./routes/home');
var friendsRouter = require('./routes/friends');

var app = express();                    //2

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');          //3

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/friends', friendsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  var vpath=req.path.toString();
  console.log(vpath);

  // set locals, only providing error in development
  res.locals.vpath=vpath;    //pot transmite variabile personale si cu locals nu numai ca parametru prin functia render
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
