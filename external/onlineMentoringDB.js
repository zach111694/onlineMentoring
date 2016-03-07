var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('onlineMentoring.db');

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

	// registerUser2: function(formData,role){
	// 	db.serialize(function(){
	// 		db.run("INSERT INTO " + role + " (`username`,`role`,`Q1`,`Q2`,`Q3`,`Q4`) VALUES ($username,$role,$q1,$q2,$q3,$q4)", {
	// 			$username: formData.username,
	// 			$role: formData.role,
	// 			$q1: formData.Q1,
	// 			$q2: formData.Q2,	
	// 			$q3: formData.Q3,
	// 			$q4: formData.Q4
	// 		});
	// 	});
	// },

	queryUsers: function(cb){
		db.all("SELECT * FROM Users", function(err,rows){
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


// module.exports = {

// 	getAllTest: function(cb) {
// 		getDb(function(err, db) {
// 			if(err) {
// 				return cb(err);
// 			}

// 			db.all("SELECT * FROM Mentors", function(err,row){
// 				if(err){
// 					db.close()
// 					return cb(err);
// 				}
				
// 				return cb(null, row);
// 			});
			
// 		});
// 	}

// }