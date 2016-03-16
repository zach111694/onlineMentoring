var sqlite3 = require('sqlite3');
var bcrypt = require('bcryptjs');
var db = new sqlite3.Database('onlineMentoring.db');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;



module.exports = {
  authenticate: function(username, password, done){

    db.get('SELECT username FROM Users WHERE username = ? AND password = ?', username, password, function(err, row) {
      if(err) {
        return done(err);
      }

      if (!row){
        return done(null, false, { message: 'Incorrect username'});
      }

      bcrypt.compare(password,row.password,function(err,result){
      // RETURNS TRUE UPON MATCH OF PASSWORD AND MATCH
        if(!result){
          return done(null,false, {message: 'Incorrect password'});
        }
      });

      return done(null, row);
    });
  }
  
}

// passport.use('local',new LocalStrategy(
//   function(username, password, done) {

//     db.get('SELECT username FROM Users WHERE username = ? AND password = ?', username, password, function(err, row) {
//       if(err) {
//         return done(err);
//       }

//       if (!row){
//         return done(null, false, { message: 'Incorrect username'});
//       }

//       bcrypt.compare(password,row.password,function(err,result){
//       // RETURNS TRUE UPON MATCH OF PASSWORD AND MATCH
//         if(!result){
//           return done(null,false, {message: 'Incorrect password'});
//         }
//       });

//       return done(null, row);
//     });
// }));

// passport.serializeUser(function(user, done) {
//   return done(null, user.userame);
// });

// passport.deserializeUser(function(username, done) {
//   db.get('SELECT username FROM users WHERE username = ?', username, function(err, row) {
//     if (!row) return done(null, false);
//     return done(null, row);
//   });
// });


