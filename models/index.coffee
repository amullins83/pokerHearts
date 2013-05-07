mongoose = require 'mongoose'
mongoose.connect 'mongodb://localhost/tliWin'

db = mongoose.connection

db.on 'error', console.error.bind(console, "Connection error: ")

db.once "open", ->
	assignmentSchema = mongoose.Schema(
		name: String
		date: Date
		postURL: String
		reflectURL: String
		postText: Array
		reflectText: String
	)

	exports.Assignment = mongoose.model "Assignment", assignmentSchema