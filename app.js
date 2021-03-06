// Express //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Passport Sessions & Hashing //
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('onlineMentoring.db');

var routes = require('./routes/index');

var app = express();

// Socket IO //
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req,res,next){
  res.io = io;
  next();
});
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));


// io.on('connection', function(socket){

//     console.log('a user connected');

//     socket.on('disconnect',function(){
//       console.log('user disconnected');
//     });

//     socket.on('chat message', function(msg){
//       io.emit('chat message','test ' + msg);
//       console.log('message: ' + msg);
//     });
// });

app.use(session({
  secret: 'learn node',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

passport.use('local',new LocalStrategy(
  function(username, password, done) {

    db.get('SELECT username, password FROM Users WHERE username = ?', username, function(err, row) {

      if(err) {
        return done(err);
      }
      
      if (!row){
        return done(null, false, { message: '*User does not exist'});
      }

      bcrypt.compare(password,row.password,function(err,result){
      // RETURNS TRUE UPON MATCH OF PASSWORD AND MATCH
      
        if(!result){
          return done(null,false, {message: '*Password is incorrect'});
        }

        return done(null, row);
      });
    });
}));

passport.serializeUser(function(user, done) {
  io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('disconnect',function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
      io.emit('chat message',user.username + ': ' + msg);
      console.log('message: ' + msg);
    });
});

  return done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  db.get('SELECT username FROM users WHERE username = ?', username, function(err, row) {
    if (!row) return done(null, false);
    
    return done(null, row.username);
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = {app:app, server:server};
