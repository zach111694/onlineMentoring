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
	if(formData.role == 'Mentor'){
		omDB.dataBase.run("INSERT INTO Mentors (`username`,`0`,`1`,`2`,`3`) VALUES ($username, $q1,$q2,$q3,$q4)",{
				$username: formData.username,
				$q1: formData.Q1,
				$q2: formData.Q2,
				$q3: formData.Q3,
				$q4: formData.Q4
		});
	} else if(formData.role == 'Mentee'){
		omDB.dataBase.run("INSERT INTO Mentees (`username`,`0`,`1`,`2`,`3`) VALUES ($username, $q1,$q2,$q3,$q4)",{
				$username: formData.username,
				$q1: formData.Q1,
				$q2: formData.Q2,
				$q3: formData.Q3,
				$q4: formData.Q4
		});
	}
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
