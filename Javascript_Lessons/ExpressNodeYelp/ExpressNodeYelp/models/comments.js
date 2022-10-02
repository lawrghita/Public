var mongoose = require("mongoose");

// comment - text, author
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports =  mongoose.model("Comment", commentSchema); 