var MaxAlgorithm = module.exports = {};
var mentors = { zyuzon: { q1: 'CSC', q2: 'Boxing', q3: 'Hearthstone', q4: 'Thai' },
  cosias: { q1: 'MAT', q2: 'Basketball', q3: 'Skyrim', q4: 'Japanese' },
  jschanker: { q1: 'CSC', q2: 'Baseball', q3: 'WoW', q4: 'Italian' },
  testUser: { q1: 'MAT', q2: 'Football', q3: 'Skyrim', q4: 'Chinese' } };

var mentees = { hstarkie: { q1: 'BUS', q2: 'Football', q3: 'WoW', q4: 'Italian' },
  rhuang: { q1: 'MUS', q2: 'Baseball', q3: 'LoL', q4: 'Chinese' },
  ramato: { q1: 'MAT', q2: 'Baseball', q3: 'LoL', q4: 'Japanese' },
  mschultz: { q1: 'MAT', q2: 'Football', q3: 'Hearthstone', q4: 'Japanese' } };

MaxAlgorithm.maxFunction = function(mentorsObj,menteesObj){
    d={};
    mentors = Object.keys(mentorsObj);
    mentees = Object.keys(menteesObj);
    function calcScore(mentor,mentee){
        var score = 0;
        for (var key in mentorsObj[mentor]){
            if (mentorsObj[mentor][key] === menteesObj[mentee][key]){
                score++;
            }
        }
        return score;
    }
    function maxSatisfaction(mentors,mentees){
        var maxScoreSoFar = 0;
        if (mentors.length === 0|| mentees.length === 0 ){
                if (! (mentors in d)){
                    d[mentors] = {};
                }
                d[mentors][mentees]={};
                d[mentors][mentees].score=0;
                d[mentors][mentees].choices=[];
        }else{
            for (var mentor = 0; mentor < mentors.length; mentor++){
                for (var mentee = 0; mentee < mentees.length; mentee++){var copyOfMentorsAfterSelection = mentors.slice(0,mentor);
                    copyOfMentorsAfterSelection = copyOfMentorsAfterSelection.concat(mentors.slice(mentor+1,mentors.length));
                    var copyOfMenteesAfterSelection = mentees.slice(0,mentee);
                    copyOfMenteesAfterSelection = copyOfMenteesAfterSelection.concat(mentees.slice(mentee+1,mentees.length));
                    if (!(([copyOfMentorsAfterSelection][copyOfMenteesAfterSelection]) in d)) {
                        maxSatisfaction(copyOfMentorsAfterSelection,copyOfMenteesAfterSelection,d);
                    }
                    var score = calcScore(mentors[mentor],mentees[mentee]) + d[copyOfMentorsAfterSelection][copyOfMenteesAfterSelection].score;
                    if (score >= maxScoreSoFar){
                        maxScoreSoFar = score;
                        if (! (mentors in d)){
                            d[mentors] = {};
                        }
                        d[mentors][mentees]={};
                        d[mentors][mentees].score = maxScoreSoFar;
                        var choice = {};
                        choice.mentor = mentors[mentor];
                        choice.mentee = mentees[mentee];
                        choiceOfNextLvl = d[copyOfMentorsAfterSelection][copyOfMenteesAfterSelection].choices;
                        choiceOfNextLvl.push(choice);
                        d[mentors][mentees].choices = choiceOfNextLvl;
                    }
                }
            }
        }
    }
    maxSatisfaction(mentors,mentees);
    console.log(d[mentors][mentees].choices);
};

MaxAlgorithm.maxFunction(mentors,mentees);

/*test code
function s(mentorsObj,menteesObj){
    d={};
    mentors = Object.keys(mentorsObj);
    mentees = Object.keys(menteesObj);
    function calcScore(mentor,mentee){
        var score = 0;
        for (var key in mentorsObj[mentor]){
            if (mentorsObj[mentor][key] === menteesObj[mentee][key]){
                score++;
            }
        }
        return score;
    }
    function maxSatisfaction(mentors,mentees){
        var maxScoreSoFar = 0;
        if (mentors.length === 0|| mentees.length === 0 ){
                if (! (mentors in d)){
                    d[mentors] = {};
                }
                d[mentors][mentees]={};
                d[mentors][mentees].score=0;
                d[mentors][mentees].choices=[];
        }else{
            for (var mentor = 0; mentor < mentors.length; mentor++){
                for (var mentee = 0; mentee < mentees.length; mentee++){var copyOfMentorsAfterSelection = mentors.slice(0,mentor);
                    copyOfMentorsAfterSelection = copyOfMentorsAfterSelection.concat(mentors.slice(mentor+1,mentors.length));
                    var copyOfMenteesAfterSelection = mentees.slice(0,mentee);
                    copyOfMenteesAfterSelection = copyOfMenteesAfterSelection.concat(mentees.slice(mentee+1,mentees.length));
                    if (!(([copyOfMentorsAfterSelection][copyOfMenteesAfterSelection]) in d)) {
                        maxSatisfaction(copyOfMentorsAfterSelection,copyOfMenteesAfterSelection,d);
                    }
                    var score = calcScore(mentors[mentor],mentees[mentee]) + d[copyOfMentorsAfterSelection][copyOfMenteesAfterSelection].score;
                    if (score >= maxScoreSoFar){
                        maxScoreSoFar = score;
                        if (! (mentors in d)){
                            d[mentors] = {};
                        }
                        d[mentors][mentees]={};
                        d[mentors][mentees].score = maxScoreSoFar;
                        var choice = {};
                        choice.mentor = mentors[mentor];
                        choice.mentee = mentees[mentee];
                        choiceOfNextLvl = d[copyOfMentorsAfterSelection][copyOfMenteesAfterSelection].choices;
                        choiceOfNextLvl.push(choice);
                        d[mentors][mentees].choices = choiceOfNextLvl;
                    }
                }
            }
        }
    }
    maxSatisfaction(mentors,mentees);
    console.log(d[mentors][mentees].choices);
    console.log(d[mentors][mentees].score)
};
var mentors = { zyuzon: { q1: 'CSC', q2: 'Boxing', q3: 'Hearthstone', q4: 'Thai' },
  cosias: { q1: 'MAT', q2: 'Basketball', q3: 'Skyrim', q4: 'Japanese' },
  jschanker: { q1: 'CSC', q2: 'Baseball', q3: 'WoW', q4: 'Italian' },
  testUser: { q1: 'MAT', q2: 'Football', q3: 'Skyrim', q4: 'Chinese' } };

var mentees = { hstarkie: { q1: 'BUS', q2: 'Football', q3: 'WoW', q4: 'Italian' },
  rhuang: { q1: 'MUS', q2: 'Baseball', q3: 'LoL', q4: 'Chinese' },
  ramato: { q1: 'MAT', q2: 'Baseball', q3: 'LoL', q4: 'Japanese' },
  mschultz: { q1: 'MAT', q2: 'Football', q3: 'Hearthstone', q4: 'Japanese' } };
s(mentors,mentees);
*/
