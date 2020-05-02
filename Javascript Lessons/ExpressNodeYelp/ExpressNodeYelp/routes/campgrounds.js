'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Campground = require('../models/campgroundSchema');
var RandomDataObject = require('../middleware/randomdata');
require('dotenv').config();
const utilizator = process.env['UTILIZATOR'];
const parola = process.env['PAROLA'];


let uri = `mongodb+srv://${utilizator}:${parola}@cluster0-8s7vx.gcp.mongodb.net/campgrounds?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//console.log(RandomDataObject.title, RandomDataObject.image, RandomDataObject.body);

/* GET home page. */

Campground.watch({ fullDocument: 'updateLookup' }).on('change', function callBackChange(change) {
    console.log("updateLookup of Change :\n", change);   //just to see any operations done to database
});

router.get('/', function (request, res, next) {
    Campground.find({}, function callBackAll(err, campgrounds) {
        if (err) {
            console.log("Error:", err)
        } else {
            /* GET all  page . */
            res.render('campgrounds.ejs', { title: 'Campgrounds', url: request.baseUrl, pictures: campgrounds });
        }
    });
});

//  SHOW    /campgrounds/:id        GET     show more info info about one element in database
router.get("/:id", function callBackShowId(request, response, next) {
    //  console.log("Request baseUrl:", request);
    const vbaseUrl = request.baseUrl;
    Campground.findById(request.params.id, function callBackAll(err, foundpicture) {
        if (err) {
            console.log("Error:", request.params.id, err)
        } else {
            /* show what well we found with that Id . */
            response.render('show.ejs', { title: 'Found well', url: vbaseUrl, picture: foundpicture });
        }
    });
});


module.exports = router;




//insertPictures();           //populate database with one camp
function insertPictures() {
    //Campground.collection.drop();
    Campground.create([{
        name: RandomDataObject.title,
        image: RandomDataObject.image,
        description: RandomDataObject.body
    }], function callBack(err, campgrounds) {
        if (err) {
            console.log("Error on create:", err);
        }
        else {
            console.log("Create: \n", campgrounds);
        }
    });
}