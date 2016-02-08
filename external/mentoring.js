var mentors =  {};// object for holding all of the potential mentors 
var students = {};//object for holding all of the students

function createObject(fName,lName,age,position,field)
{
	if(position.toLowerCase() === 'mentor')
	{
		mentors[fName+','+lName] = 
		{
			firstName : fName,
			lastName : lName,
			Age : age,
			Position : 'Mentor',
			Field : field
		};
	} 



	else if(position.toLowerCase() === 'student')
	{
		students[fName+','+lName] = 
		{
			firstName : fName,
			lastName : lName,
			Age : age,
			Position : 'Student',
			Field : field
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
createObject('first','last',20,'StudeNt','CS');
createObject('Carl','Osias',21,'MenTor','CS');
createObject('dummy','dummy',55,'Slacker','dropout');

console.log('List of Mentors: ');
console.log(mentors);
console.log('List of Students: ');
console.log(students);

