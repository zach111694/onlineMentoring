var express = require('express');
var router = express.Router();
var fs = require('fs');
var omDB = require('../config/onlineMentoringDB');
var bcrypt = require('bcryptjs');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


router.get('/', checkIndex,function (req, res) {
	
    res.render('index', {title: 'Online Mentoring'});

});

router.get('/profile', loggedIn, function(req, res){
	omDB.retrieveUserData(req.user,function(err,usrData){
		res.render('profile',{title: 'Profile', user: usrData});
	});
});

router.get('/about',loggedIn,function(req,res){
	res.render('about',{title: 'About'});
});

router.get('/contact',loggedIn,function(req,res){
	res.render('contact',{title: 'Contact'});
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

router.post('/signup',function(req,res){
	var formData = req.body;

	bcrypt.genSalt(10,function(err,salt){
		bcrypt.hash(formData.password,salt,function(err,hash){
			formData.password = hash;
			omDB.registerUser(formData);
		});
	});

	res.send(req.body);
 
});

router.get('/questionnaire',loggedIn,function (req, res) {
	fs.readFile("data/questions.json", "utf8", function(error, text) {
  		if (error)
    		throw error;

    	var questionsData = JSON.parse(text);

    	res.render('questionnaire', {title: 'Online Mentoring', questionsData: questionsData});
	});
});


router.get('/login',function(req,res){
	res.render('loginReq',{title:'Log In Required'})
});

router.get('/logout', function(req,res){
	req.logout();
	res.redirect('/');
});




router.get('/pair',loggedIn, function(req,res){
	res.render('pair',{title:'Pair', user: req.user});
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

	res.send(formData);

});

function checkIndex(req,res,next){
	if(req.user){
		omDB.retrieveUserData(req.user,function(err,usrData){
		res.render('home',{title: 'Online Mentoring', user: usrData});
	});
	} else {
		next();
	}
}

function loggedIn(req,res,next){

	if(req.user){
		next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;
