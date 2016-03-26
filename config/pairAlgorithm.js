var omDB = require('./onlineMentoringDB.js');

var MaxAlgorithm = module.exports = {};

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

    return(d[mentors][mentees].choices);
};


var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("Running pair algorithm");
  omDB.getMentorsMentees(function(err,mentors,mentees){
    var pairs = MaxAlgorithm.maxFunction(mentors,mentees);
    
    omDB.setPairs(pairs,function(err){
        if(err){
            console.log(err);
        }
    });
});
}, the_interval);


