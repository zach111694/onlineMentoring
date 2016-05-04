var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('onlineMentoring.db');
	
module.exports = {

	checkForSurvey:function(username,cb){
		db.all("SELECT * FROM SurveyII WHERE username = ?",username,function(err,rows){
			if(err){
				return cb(err);
			}
			

			var userSurveys = {};

			for(var i in rows){

				var obj = rows[i];

				if(!(obj.survey_title in userSurveys)){
					userSurveys[obj.survey_title] = [];
				}

				userSurveys[obj.survey_title].push({
					question: obj.question,
					answers: [
						obj.answer1,
						obj.answer2,
						obj.answer3,
						obj.answer4
					]
				});
			}

			cb(null,userSurveys);
		});
	},

	getUserData: function(username,cb){
		db.get("SELECT first_name,last_name,survey,paired,score FROM Users WHERE username = ?",username, function(err,rows){
			if(err){
				return cb(err);
			}

			cb(null,rows);
		});
	},		

	registerUser: function(registerData,cb){

		db.run("INSERT INTO Users (`username`,`password`,`first_name`,`last_name`) VALUES ($username,$password,$first_name,$last_name)", {
			$username: registerData.username,
			$password: registerData.password,
			$first_name: registerData.firstName,
			$last_name: registerData.lastName
		},function(err){
			if(err){
				return cb(err);
			}

			return cb(null,registerData.username,registerData.password);
		});
	},

	insertSurveyData:function(data,theUser,num){
		/*var x = data['question'+num];
		var y = data['answer1Question'+num];
		console.log(x);
		console.log(y);*/
		//for each question filled out, loop through
		db.run("INSERT INTO SurveyII (`username`,`survey_title`,`question`,`answer1`,`answer2`,`answer3`,`answer4`) VALUES ($username,$survey_title,$question,$answer1,$answer2,$answer3,$answer4)", {
			$username: theUser,
			$survey_title: data['surveyName'],
			$question: data['question'+num],
			$answer1: data['answer1Question'+num],
			$answer2: data['answer2Question'+num],
			$answer3: data['answer3Question'+num],
			$answer4: data['answer4Question'+num]
		});
	},

	getSurvey: function(cb){
		db.all("SELECT * FROM Survey", function(err,rows){
			if(err){
				return cb(err);
			}

			var survey = [];

			for(var i in rows){
				var q = rows[i];

				survey.push({
					qNum: q.id,
					question: q.question,
					answers: [
						q.answer1,
						q.answer2,
						q.answer3,
						q.answer4
					]
				});
			}

			cb(null,survey);
		});
	},

	submitSurvey: function(username,surveyResults,cb){
		if(surveyResults.role == "Mentor"){
			var table = "Mentors";
		} else {
			var table = "Mentees"
		}

		db.run("INSERT INTO " + table + "(`username`,`answer1`,`answer2`,`answer3`,`answer4`) VALUES ($usr,$a1,$a2,$a3,$a4)",{
			$usr: username,
			$a1: surveyResults.Q1,
			$a2: surveyResults.Q2,
			$a3: surveyResults.Q3,
			$a4: surveyResults.Q4
		});

		db.run("UPDATE Users SET `survey` = 'yes' WHERE username = ?",username);
	},

	getMentorsMentees: function(cb){
		db.all("SELECT * FROM Mentors",function(err,mentors){
			if(err){
				return cb(err);
			}

			db.all("SELECT * FROM Mentees",function(err,mentees){
				if(err){
					return cb(err);
				}

				var mentorsObject = {};

				for(var i in mentors){
					var user = mentors[i];

					mentorsObject[user.username] = {
						a1: user.answer1,
						a2: user.answer2,
						a3: user.answer3,
						a4: user.answer4
					};
				}

				var menteesObject = {};

				for(var j in mentees){
					var user = mentees[j];

					menteesObject[user.username] = {
						a1: user.answer1,
						a2: user.answer2,
						a3: user.answer3,
						a4: user.answer4
					};
				}

				cb(null,mentorsObject,menteesObject);

			});			
		});	
	},

	setPossiblePairs: function(pairs,cb){

		db.serialize(function(){
			db.run("UPDATE Users SET `paired` = ''");
			db.run("UPDATE Users SET `score` = '0'")

			var pairedUsers = pairs;

			for(var i in pairedUsers){
				var pairObj = pairedUsers[i];
				var mentor = pairObj.mentor;
				var mentee = pairObj.mentee;
				var score = pairObj.score;

				db.run("UPDATE Users SET `paired` = ?, `score` = ? WHERE username = ?",mentee,score,mentor);
				db.run("UPDATE Users SET `paired` = ?, `score` = ? WHERE username = ?",mentor,score,mentee);
			}
		});

		cb(null);
	}
}
