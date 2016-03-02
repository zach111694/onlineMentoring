var MaxAlgorithm = module.exports = {};

MaxAlgorithm.maxFunction = function(mentors,mentees){
    d={};
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
                    if (score > maxScoreSoFar){
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

/*test code
function calcScore(m,s){
    if(m === "a"){
        if(s ==="d"){
            return 3;
        }else if(s==="e"){
            return 5;
        }else{return 4;}
    }else if(m ==="b"){
        if(s ==="d"){
            return 2;
        }else if(s==="e"){
            return 4;
        }else{return 6;}
    }else{if(s ==="d"){
            return 1;
        }else if(s==="e"){
            return 2;
        }else{return 3;}
    }
}
d={};
function s(mentors,mentees){
    d={};
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
                    if (score > maxScoreSoFar){
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
    console.log(d)
};
s(["a","b","c"],["d","e","f"]);
*/
