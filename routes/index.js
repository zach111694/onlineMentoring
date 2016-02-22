var express = require('express');
var router = express.Router();
var fs = require('fs');
var omDB = require('../external/onlineMentoringDB');


/* GET home page. */

router.get('/', function (req, res) {
	fs.readFile("data/questions.json", "utf8", function(error, text) {
  		if (error)
    		throw error;

    	omDB.doQuery(function(err,result){
    		console.log(result);
    	});

    	var questionsData = JSON.parse(text);

    	res.render('index', {title: 'Mentoring', questionsData: questionsData});
	});
});

router.post('/', function(req, res) {

	var formData = req.body; 
	console.log(formData);
	// if err <= VALIDATE THE FORM
	// res.render index {asdasd asdasd asdas}
	// else
	// res.render success.ejs
	// 
	// create new user...
	// 
	// 

	return res.send(req.body);
});



module.exports = router;
