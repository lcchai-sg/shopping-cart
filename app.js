const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const chalk = require('chalk');
const passport = require('passport');
const flash = require('connect-flash');

const config = require('./config/config');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const session = require('express-session');

const app = express();

// db
mongoose.connect(config.dbconn, { useNewUrlParser: true })
.then(res => console.log(chalk.bgGreen('Connected to DB...')))
.catch(err => console.log(chalk.bgRed('DB Connection Error: ', err)));

require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'P@ssw0rd', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('request: ', req);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
