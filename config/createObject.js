var omDB = require('../config/onlineMentoringDB');
var usersObject = {};
// steve is using arrays to hold data 

function createObject(queryObject)
{

	if(queryObject.role === 'Mentor')
	{
		usersObject[queryObject.username] =
		{
			q1:queryObject.Q1,
			q2:queryObject.Q2,
			q3:queryObject.Q3,
			q4:queryObject.Q4
		};
	}

	else if(queryObject.role === 'Mentee')

	{
		usersObject[queryObject.username] =
		{
			q1:queryObject.Q1,
			q2:queryObject.Q2,
			q3:queryObject.Q3,
			q4:queryObject.Q4
		};
	}

}//Takes in the properties of a potential mentor/student and creates an object that is placed in the respective positions object 
 // student:Holds all students/mentor:Holds all mentors),
 // if a position other than mentor or student is entered the user is alerted that they an invalid position has been entered.



//Testing of the function 
// createObject('carl','mentor','answer');
// createObject('zach','mentee','answer');
// createObject('steve','mentor','answer');

// console.log('List of Mentors: ');
// console.log(mentors);
// console.log('List of Mentees: ');
// console.log(mentees);
