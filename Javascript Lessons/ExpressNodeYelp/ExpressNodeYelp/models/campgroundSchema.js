var mongoose = require("mongoose");
var Comment = require('../models/comments.js')

var campgroundSchema = new mongoose.Schema({
    name: String,  
    image: String,
    description: String,
    //comments:[Comment.schema],                //direct data
    comments:[{                                 //by ID reference
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
});

module.exports = mongoose.model("Campground", campgroundSchema);

 
