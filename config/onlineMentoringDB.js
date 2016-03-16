var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('onlineMentoring.db');

var express = require('express');
// CHANGE DIRECTORY TO /external AND TYPE 'node OnlineMentoringDB.js' to test functions below.
// 
//



module.exports = {

	doQuery: function (cb,role) {
		db.serialize(function(){

			db.all("SELECT * FROM "+ role, function(err,row){
				if(err){
					return cb(err);
				}

				cb(null, row);
			});
		});
	},

	retrieveUserData: function(username,cb){
		db.get("SELECT first_name,last_name FROM Users WHERE username = ?",username, function(err,rows){
			if(err){
				return cb(err);
			}

			cb(null,rows);
		});
	},

	registerUser: function(registerData){
		db.run("INSERT INTO Users (`username`,`password`,`first_name`,`last_name`) VALUES ($username,$password,$first_name,$last_name)", {
			$username: registerData.username,
			$password: registerData.password,
			$first_name: registerData.firstName,
			$last_name: registerData.lastName
		});
		
	}

}

//doQuery
// (function(err, data) {
// 	console.log(data);
// });


// function getDb(cb) {
// 	cb(null, new sqlite3.Database('onlineMentoring.db'));
// }
