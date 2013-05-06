Array.prototype.equals = (otherArray)->
	if this.length != otherArray.length
		return false
	for el, i  in this
		if el != otherArray[i]
			return false
	true

Array.prototype.percentMatch = (otherArray)->
	count = 0
	for el, i in this
		if el == otherArray
			count += 1
	return count / float(this.length)

class RungValidator
	constructor: (@correct, @ladder)->
		@regExList = 
			"contacts":/XI[OC],\w{1,2}:\d{1,3}\/\d{1,2}/g
			"coils":/OT[LUE],\w{1,2}:\d{1,3}\/\d{1,2}/g
			"branches":/(BST,\d | NXT,\d | BND,\d)/g
			"timers":/TO[NF],T4:\d{1,3},\d{1,10}/g
			"counters":/CT[UD],C5:\d{1,3},\d{1,10}/g

	testMatch: (regexName)->
		regex = @regExList[regexName]
		@correctMatch = @correct.match regex
		@ladderMatch = @ladder.match regex
		@correctMatch and @ladderMatch and @correctMatch.equals @ladderMatch

	howClose:  ()->
		close = 0.0
		for regex, regexName in @regExList
			unless this.testMatch regexName
				close += @correctMatch.percentMatch @ladderMatch
			else
				close += 1
		close / float(@regExList.length)

class ProgramValidator
	constructor: (@correctFileName, @studentFileName)->
		# open files for read
		# copy rungs into rungs arrays
		# close files

	testRungs: ()->
		programMatchPercent = 0
		for rung in correctRungs
			MaxRungMatchPercent = 0
			for testRung in studentRungs
				rungValidator = new RungValidator(rung, testRung)
				howClose = rungValidator.howClose
				if (1 - howClose) < 0.0001
					MaxRungMatchPercent = 1.0
					break
				else if howClose > MaxRungMatchPercent
					MaxRungMatchPercent = howClose
			programMatchPercent += MaxRungMatchPercent
		programMatchPercent / float(correctRungs.length) 