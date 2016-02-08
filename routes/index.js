var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res) {
	fs.readFile("../data/questions.json", "utf8", function read(error,text) {
		if (error){
			throw error;
		}

    	var questionsData = JSON.parse(text);
    	res.render('index', {title: 'Mentoring', questionsData: questionsData});
	});
	
});

module.exports = router;
