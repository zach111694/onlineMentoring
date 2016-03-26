var express = require('express');
var router = express.Router();
var fs = require('fs');
var omDB = require('../config/onlineMentoringDB');
var bcrypt = require('bcryptjs');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var db = require('../config/onlineMentoringDB');

router.get('/', checkIndex,function (req, res) {
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	var flashErr = req.flash().error;
	var regFlash = req.session["successRegister"];
	req.session["successRegister"] = null;

    res.render('index', {title: 'Online Mentoring', flash: flashErr, regFlash: regFlash});
});

router.get('/profile', loggedIn, function(req, res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	omDB.getUserData(req.user,function(err,usrData){
		res.render('profile',{title: 'Profile', user: usrData});
	});
});

router.get('/about',loggedIn,function(req,res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('about',{title: 'About'});
});

router.get('/contact',loggedIn,function(req,res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('contact',{title: 'Contact'});
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

router.post('/register',function(req,res,next){
	var registerForm = req.body;

	bcrypt.genSalt(10,function(err,salt){
		bcrypt.hash(registerForm.password,salt,function(err,hash){
			registerForm.password = hash;

			omDB.registerUser(registerForm,function(err,username,password){
				if(err) {
					res.redirect('/');
				} else {
					req.session["successRegister"] = "Account Created!";
					res.redirect('/');
				}
			});
		});
	});
});

router.get('/survey',loggedIn,surveyTaken,function (req, res) {
		
		
    	omDB.getSurvey(function(err,questionsData){

    		res.render('survey', {title: 'Survey', questions: questionsData});
    	});
});

router.post('/survey',function(req, res) {

	var formData = req.body;

	omDB.submitSurvey(req.user,formData,function(err){
		console.log(err);
	});

	res.redirect('/');
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



function checkIndex(req,res,next){

	if(req.user){
		
		omDB.getUserData(req.user,function(err,usrData){

			console.log(usrData.paired);	
			res.render('home',{
				title: 'Online Mentoring', 
				user: usrData
			});
		});
	} else {
		next();
	}
}

function surveyTaken(req,res,next){
	omDB.getUserData(req.user,function(err,usrData){
		if(usrData.survey == "yes"){
			res.redirect('/');
		} else {
			next();
		}
	});
}

function loggedIn(req,res,next){

	if(req.user){
		next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;
