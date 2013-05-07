// Generated by CoffeeScript 1.6.2
(function() {
  var db, mongoose;

  mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/tliWin');

  db = mongoose.connection;

  db.on('error', console.error.bind(console, "Connection error: "));

  db.once("open", function() {
    var assignmentSchema;

    assignmentSchema = mongoose.Schema({
      name: String,
      date: Date,
      postURL: String,
      reflectURL: String,
      postText: Array,
      reflectText: String
    });
    return exports.Assignment = mongoose.model("Assignment", assignmentSchema);
  });

}).call(this);
