//code to encrypt passwords (server side)
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('onlineMentoring.db');
var userSchema = db.Schema({
	local: {
		username: String,
		password: String
	}
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.local.password);
}

module.exports = db.model('User',userSchema);
