var express = require('express');
var router = express.Router();
var fs = require('fs');
var omDB = require('../external/onlineMentoringDB');


/* GET home page. */

router.get('/', function (req, res) {

	omDB.doQuery(function(err,result){

		console.log(result);

	},"Mentors");

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
	// res.redirect('/pair');
});

router.get('/profile',function(req,res){
	res.render('profile');
});

router.get('/pair',function(req,res){
	res.render('pair',{title:'Pair'});
});
router.get('/signup',function(req,res){
	res.render('signup',{title:'Signup'});
});

router.get('/login',function(req,res){
	res.render('login',{title:'Login'});
});

router.get('/pair',function(req,res){
	res.render('pair',{title:'Pair'});
});



module.exports = router;
