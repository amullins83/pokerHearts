# Assignment spec
Assignment = require("../../models").Assignment

describe "Assignment", ->
	firstAssignment = null

	it "should be defined", (done)->
		Assignment.find {}, (err, assignments)->
			expect(err?).toBe false
			firstAssignment = assignments[0]
			expect(firstAssignment).toBeDefined()
			done()

	it "should have a name", ->
		expect(firstAssignment.name).toBeDefined()