var MaxAlgorithm = module.exports = {};

MaxAlgorithm.maxFunction = function(mens,ss){
	var maxScoreSoFar =0;
	var d = {};
	function maxSatisfaction(mens,ss,d){
		for (var men = 0; men < mens.length; men++){
			for (var s = 0; s < s.length; s++){
				var copyOfMensAfterSelection = mens.slice(men,men+1);
				var copyOfSsAfterSelection = ss.slice(s,s+1);
				if (!(([copyOfMensAfterSelection][copyOfSsAfterSelection]) in d)) {
					maxSatisfaction(copyOfMensAfterSelection,copyOfSsAfterSelection,d);
				}
				var score = getScore(mens[men],ss[s]) + d[copyOfMensAfterSelection][copyOfSsAfterSelection].score;
				if (score > maxScoreSoFar) {
					maxScoreSoFars = score;
					d[mens][ss].score = maxScoreSoFar;
					var choice = new Object();
					choice.men = mens[men];
					choice.s = ss[s];
					d[mens][ss].choices = d[copyOfMensAfterSelection][copyOfSsAfterSelection].choices.push(choice)
				}
			}
		}
	}
	maxSatisfaction(mens,ss,d);
	console.log(d[mens][ss].choices);
}

