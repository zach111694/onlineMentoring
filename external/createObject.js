var mentors =  [];// object for holding all of the potential mentors 
var mentees = [];//object for holding all of the students

// steve is using arrays to hold data 


function createObject(userName,role,answers)
{
	if(role.toLowerCase() === 'mentor')
	{
		mentors[userName] =
		{
			//UserName: userName,
			Role: 'Mentor',
			Answers: answers
		};
	} 



	else if(role.toLowerCase() === 'mentee')
	{
		mentees[userName] =
		{
			//UserName: userName,
			Role: 'Mentee',
			Answers: answers
		};
	}
	
	else
	{
	    console.log("You've listed an invalid position");
	}

}//Takes in the properties of a potential mentor/student and creates an object that is placed in the respective positions object 
 // student:Holds all students/mentor:Holds all mentors),
 // if a position other than mentor or student is entered the user is alerted that they an invalid position has been entered.



//Testing of the function 
createObject('carl','mentor','answer');
createObject('zach','mentee','answer');
createObject('steve','mentor','answer');

console.log('List of Mentors: ');
console.log(mentors);
console.log('List of Mentees: ');
console.log(mentees);
