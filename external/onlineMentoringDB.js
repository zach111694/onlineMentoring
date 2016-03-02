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

	registerUser: function(formData,role){
		db.serialize(function(){
			db.run("INSERT INTO " + role + " (`username`,`role`,`Q1`,`Q2`,`Q3`,`Q4`) VALUES ($username,$role,$q1,$q2,$q3,$q4)", {
				$username: formData.username,
				$role: formData.role,
				$q1: formData.Q1,
				$q2: formData.Q2,	
				$q3: formData.Q3,
				$q4: formData.Q4
			});
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