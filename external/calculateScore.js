
// TEST OBJECT CREATED FROM CREATEOBJECT.JS (CARL'S FILE/FUNCTION)

var mentors = { zyuzon: { q1: 'CSC', q2: 'Boxing', q3: 'Hearthstone', q4: 'Thai' },
  cosias: { q1: 'MAT', q2: 'Basketball', q3: 'Skyrim', q4: 'Japanese' },
  jschanker: { q1: 'CSC', q2: 'Baseball', q3: 'WoW', q4: 'Italian' },
  testUser: { q1: 'MAT', q2: 'Football', q3: 'Skyrim', q4: 'Chinese' } };

var mentees = { hstarkie: { q1: 'BUS', q2: 'Football', q3: 'WoW', q4: 'Italian' },
  rhuang: { q1: 'MUS', q2: 'Baseball', q3: 'LoL', q4: 'Chinese' },
  ramato: { q1: 'MAT', q2: 'Baseball', q3: 'LoL', q4: 'Japanese' },
  mschultz: { q1: 'MAT', q2: 'Football', q3: 'Hearthstone', q4: 'Japanese' } };


function calcScore(mentor,mentee){
	var score = 0;
	mentorAnswers = mentors[mentor];
	menteeAnswers = mentees[mentee];

	for(var i in mentorAnswers){
		if(mentorAnswers[i] == menteeAnswers[i]){
			score += 1;
		}
	}
	return score;
};


console.log(calcScore('cosias','ramato'));
