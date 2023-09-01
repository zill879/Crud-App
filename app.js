var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser=require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var allrounderdataRouter = require('./routes/all_rounder'); 
var statedataRouter = require('./routes/state');
var teamdataRouter = require('./routes/team');
var typedataRouter = require('./routes/type');
var pakplayerdataRouter = require('./routes/pak_player');
var formatsdataRouter = require('./routes/formats');
var balldataRouter = require('./routes/ball');
var batdataRouter = require('./routes/bat');
var teampakplayerdataRouter = require('./routes/team_pak_player');
var pakplayerstatsdataRouter = require('./routes/pak_player_stats');
var viewdataRouter = require('./routes/view');
var app = express();
var session=require('express-session')

app.use(session({
  secret : 'webslesson',
  resave : true,
  saveUninitialized : true
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use ('/all_rounder' , allrounderdataRouter);
app.use ('/state' , statedataRouter);
app.use ('/team' , teamdataRouter);
app.use ('/type' , typedataRouter);
app.use ('/pak_player' , pakplayerdataRouter);
app.use ('/formats' , formatsdataRouter);
app.use ('/ball' , balldataRouter);
app.use ('/bat' , batdataRouter);
app.use ('/team_pak_player' , teampakplayerdataRouter);
app.use ('/pak_player_stats' , pakplayerstatsdataRouter);
app.use ('/view' , viewdataRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
