var MaxAlgorithm = module.exports = {};

MaxAlgorithm.maxFunction = function(mens,ss){
	d={};
	function maxSatisfaction(mens,ss){
    	var maxScoreSoFar = 0;
    	if (mens.length === 0|| ss.length === 0 ){
    			if (! ([mens] in d)){
                    d[mens] = {};
                }
    			d[mens][ss]={};
    			d[mens][ss].score=0;
    			d[mens][ss].choices=[];
    	}else{
        	for (var men = 0; men < mens.length; men++){
    				for (var s = 0; s < ss.length; s++){var copyOfMensAfterSelection = mens.slice(0,men);
    					copyOfMensAfterSelection = copyOfMensAfterSelection.concat(mens.slice(men+1,mens.length));
    					var copyOfSsAfterSelection = ss.slice(0,s);
    					copyOfSsAfterSelection = copyOfSsAfterSelection.concat(ss.slice(s+1,ss.length));
    					if (!(([copyOfMensAfterSelection][copyOfSsAfterSelection]) in d)) {
    						maxSatisfaction(copyOfMensAfterSelection,copyOfSsAfterSelection,d);
    					}
    					var score = calcScore(mens[men],ss[s]) + d[copyOfMensAfterSelection][copyOfSsAfterSelection].score;
    					if (score > maxScoreSoFar){
    					    maxScoreSoFar = score;
    					    if (! ([mens] in d)){
    					        d[mens] = {};
    					    }
    					    d[mens][ss]={};
    						d[mens][ss].score = maxScoreSoFar;
    						var choice = {};
    						choice.men = mens[men];
    						choice.s = ss[s];
    						choiceOfNextLvl = d[copyOfMensAfterSelection][copyOfSsAfterSelection].choices;
    						choiceOfNextLvl.push(choice);
    						d[mens][ss].choices = choiceOfNextLvl;
    					}
    				}
    	    }
	    }
	}
	maxSatisfaction(mens,ss,d);
	console.log(d[mens][ss].choices);
}

/*test code
function getScore(m,s){
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
function maxSatisfaction(mens,ss,d){
    var maxScoreSoFar = 0;
    if (mens.length === 0|| ss.length === 0 ){
    		d[mens]={};
    		d[mens][ss]={};
    		d[mens][ss].score=0;
    		d[mens][ss].choices=[];
    }else{
        for (var men = 0; men < mens.length; men++){
    			for (var s = 0; s < ss.length; s++){var copyOfMensAfterSelection = mens.slice(0,men);
    				copyOfMensAfterSelection = copyOfMensAfterSelection.concat(mens.slice(men+1,mens.length));
    				var copyOfSsAfterSelection = ss.slice(0,s);
    				copyOfSsAfterSelection = copyOfSsAfterSelection.concat(ss.slice(s+1,ss.length));
    				if (!(([copyOfMensAfterSelection][copyOfSsAfterSelection]) in d)) {
    					maxSatisfaction(copyOfMensAfterSelection,copyOfSsAfterSelection,d);
    				}
    				var score = getScore(mens[men],ss[s]) + d[copyOfMensAfterSelection][copyOfSsAfterSelection].score;
    				if (score > maxScoreSoFar){
    				    maxScoreSoFar = score;
    				    if (! ([mens] in d)){
    				        d[mens] = {};
    				    }
    				    d[mens][ss]={};
    					d[mens][ss].score = maxScoreSoFar;
    					var choice = new Object();
    					choice.men = mens[men];
    					choice.s = ss[s];
    					choiceOfNextLvl = d[copyOfMensAfterSelection][copyOfSsAfterSelection].choices;
    					choiceOfNextLvl.push(choice);
    					d[mens][ss].choices = choiceOfNextLvl;
    				}
    			}
        }
    }
}
maxSatisfaction(["a","b","c"],["d","e","f"],d);
console.log(d)
console.log(d["a,b,c"]["d,e,f"])
*/
