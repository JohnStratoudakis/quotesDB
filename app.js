var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http = require('http');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var quotesRouter = require('./routes/quotes');

console.log("APP APP APP APP APP APP");
// DB Setup
console.log('Connecting to Database');

var mongoHost = "127.0.0.1";

if(process.env.database) {
  mongoHost = process.env.database;
  console.log("Overriding mongo host to " + mongoHost);
}
console.log("MONGO Database host: " + mongoHost);
mongoose.connect('mongodb://' + mongoHost + ':27017/quotesDB');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/quotes', quotesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

function stop () {
  server.close();
  mongoose.disconnect();
}

module.exports = app;
module.exports.stop = stop;
module.exports.database = mongoose;
