"use strict"

mongoose = require "mongoose"
if process.env.test
	mongoose.connect "mongodb://localhost/test"
else
	mongoose.connect "mongodb://#{process.env.MONGOLABS_USER}:#{process.env.MONGOLABS_PASS}@ds061787.mongolab.com:61787/heroku_app15454729"

db = exports.db = mongoose.connection


exports.assignmentObject =
		name: String
		date: Date
		postURL: String
		reflectURL: String
		postText: Array
		reflectText: String
	
exports.ready = (handler)->
		db.once "open", handler
	
exports.ready ->
	Assignment = exports.Assignment = mongoose.model "Assignment", mongoose.Schema(exports.assignmentObject)
	Assignment.prototype.addPost = (newPost)->
		unless this.postText.length == 3
			this.postText.push newPost
	
	Assignment.prototype.addReflect = (newReflection)->
		unless this.reflectText?
			this.reflectText = newReflection
			
	Assignment.eachDate = (handler, callback)->
		exports.Assignment.find (err, assignments)->
			handler(assignment.date) for assignment in assignments
			callback()
	
	Assignment.eachName = (handler, callback)->
		exports.Assignment.find (err, assignments)->
			handler(assignment.name) for assignment in assignments
			callback()

	Assignment.prototype.postsComplete = ->
		return this.postText.length == 3
		
	Assignment.prototype.done = ->
		return this.postText.length == 3 and this.reflectText?