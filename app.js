var createError = require('http-errors');
var express = require('express');
var validator=require('express-validator');

const mongoose=require('mongoose');
require("dotenv").config();
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGOURI,{useNewUrlParser:true});

var session=require('express-session');

var MongoStore=require('connect-mongo')(session);

require('./config/passport');
var passport=require('passport');
var flash=require('connect-flash');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exhbs=require('express-handlebars');
//var csrf=require('csurf');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exhbs({defaultLayout:'layout',extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
app.use(session({
  secret:'mysupersecret',
  resave:false,
  saveUninitialized:false,
  store:new MongoStore({mongooseConnection:mongoose.connection}),
  cookie:{maxAge:180*60*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req ,res ,next)=>{
  res.locals.login=req.isAuthenticated();
  res.locals.session=req.session;
  next();
});

//app.use(csrf());
app.use('/user', usersRouter);
app.use('/', indexRouter);
app.use('/prac',require('./routes/prac'));


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

module.exports = app;
