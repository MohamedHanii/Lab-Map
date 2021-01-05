var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var passport = require("passport");
var LocalStrategy = require("passport-local");


var bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  User = require("./models/user"),
  Dentist = require("./models/dentist"),
  Technician = require("./models/technician")



// , methodOverride = require ("method-override");

// Connection to MongoDB
mongoose.connect("mongodb://localhost:27017/labmap", { useNewUrlParser: true });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));






//=============== Passport Configuration ============
app.use(require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
