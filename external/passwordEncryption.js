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

<<<<<<< HEAD
module.exports = db.model('User',userSchema);
=======
module.exports = db.model('User',userSchema);
>>>>>>> c836444da5584fb1a3015e49ac9b72277c8f7f6c
