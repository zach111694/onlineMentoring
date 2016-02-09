
var questionsObj = {
	Q1: {val:2},
	Q2: {val:3}
};

var men = {
	Q1: "A",
	Q2: "B"
};

var stu = {
    Q1: "A",
    Q2: "B"
};




function calcScore(mentor,student,questions){
	var score = 0;
	for(var question in questions){
	    console.log(mentor[question]);
	    console.log(student[question]);
		if(mentor[question] === student[question]){
			var value = questions[question].val;
			score += value;
		}
	}
	return score;
}

calcScore(men,stu,questionsObj);
