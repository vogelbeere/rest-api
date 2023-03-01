var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dataRouter = require('./routes/data');
var transactionsRouter = require('./routes/transactions');

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
app.use('/data', dataRouter);
app.use('/transactions', transactionsRouter);

app.use('/static', express.static('public'));
app.use(express.static('public'));
app.use(express.static('files'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 500 error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});

/** Respond to a PUT request to the /user route: */
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

/** Respond to a DELETE request to the /user route: */
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});

module.exports = app;
