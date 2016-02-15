var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('onlineMentoring.db');

// CHANGE DIRECTORY TO /external AND TYPE 'node OnlineMentoringDB.js' to test functions below.

function doQuery(cb) {

	db.serialize(function(){

		
		db.all("SELECT * FROM registered_users", function(err,row){
			if(err){
				return err;
			}
			
			cb(null, row);
		});
		
	});

}

doQuery(function(err, data) {
	console.log(data);
});


db.close();

// function getDb(cb) {
// 	cb(null, new sqlite3.Database('onlineMentoring.db'));
// }


// module.exports = {

// 	getAllTest: function(cb) {
// 		getDb(function(err, db) {
// 			if(err) {
// 				return cb(err);
// 			}
// 			db.all("SELECT * FROM testTable", function(err,row){
// 				if(err){
// 					db.close()
// 					return cb(err);
// 				}
				
// 				return cb(null, row);
// 			});
			
// 		});
// 	},



// }