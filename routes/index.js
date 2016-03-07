var express = require('express');
var router = express.Router();
var fs = require('fs');
var omDB = require('../external/onlineMentoringDB');
var bcrypt = require('bcryptjs');

router.get('/', function (req, res) {

	// TEST COMPARE OF PASSWORD AND HASH
	
	omDB.queryUsers(function(err,res){
		bcrypt.compare('ihatestevejobs',res[0].password,function(err,result){
			// RETURNS TRUE UPON MATCH OF PASSWORD AND MATCH
			console.log(result);
		});
	});

    res.render('index', {title: 'Online Mentoring'});

});

router.get('/questionnaire',function (req, res) {
	fs.readFile("data/questions.json", "utf8", function(error, text) {
  		if (error)
    		throw error;

    	var questionsData = JSON.parse(text);
    	omDB.doQuery(function(err,res){
    		console.log(res);
    	});
    	res.render('questionnaire', {title: 'Online Mentoring', questionsData: questionsData});
	});
});


router.post('/questionnaire',function(req, res) {

	var formData = req.body; 
	var role = "";


	if(formData.role == 'Mentor'){
		role = "Mentors";
	} else if(formData.role == 'Mentee'){
		role = "Mentees";
	}

	omDB.registerUser(formData,role);

	// if err <= VALIDATE THE FORM
	// res.render index {asdasd asdasd asdas}
	// else
	// res.render success.ejs
	// 
	// create new user...
	// 
	// 

	res.send(formData);
	// res.redirect('/profile');
});

router.get('/profile',function(req,res){
	
	//TEST REGISTER
	var formData = {
		username: 'sjobs',
		password: 'ihatebillgates',
		firstName: 'Steve',
		lastName: 'Jobs',
	};


	bcrypt.genSalt(10,function(err,salt){
		bcrypt.hash(formData.password,salt,function(err,hash){
			formData.password = hash;
			omDB.registerUser2(formData);
		});
	});
	

	res.render('profile',{title: 'Profile'});
});

router.post('/signup',function(req,res){

	res.send(req.body);

});

router.post('/login',function(req,res){
	res.send(req.body);
});

router.get('/pair',function(req,res){
	res.render('pair',{title:'Pair'});
});

router.get('/pair',function(req,res){
	res.render('pair',{title:'Pair'});
});

module.exports = router;
