# RSL Validation Functions
Array.prototype.equals = (otherArray)->
	if this.length != otherArray.length
		return false
	for el, i  in this
		if el != otherArray[i]
			return false
	true
	
class RSLValidator
	constructor: (@correct, @ladder)->
		@regExList = 
			"inputs":/XI[OC],I:\d\/\d{1,2}/g
			"outputs":/OT[LUE],O:\d\/\d{1,2}/g

	testMatch: (regexName)->
		regex = @regExList[regexName]
		correctMatch = @correct.match regex
		ladderMatch = @ladder.match regex
		correctMatch and ladderMatch and correctMatch.equals ladderMatch
