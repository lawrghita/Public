//  REST ROUTES on /gallery:
//  name       url              route VERB        description
//  =============================================
//  INDEX   /gallery            GET     display all 
//  NEW     /gallery/new        GET     form to interogate for a new gallery
//  CREATE  /gallery            POST    add a new well in databbase
//  SHOW    /gallery/:id        GET     show info about one element in database


'use strict';
require('dotenv').config();
const utilizator = process.env['UTILIZATOR'];
const parola = process.env['PAROLA'];
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

let uri = `mongodb+srv://${utilizator}:${parola}@cluster0-8s7vx.gcp.mongodb.net/gallery?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//SCHEMA SETUP
var gallerySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Gallery = new mongoose.model('gallerycollection', gallerySchema); //singular name, in database is at plural gallerycollectionS
Gallery.watch({ fullDocument: 'updateLookup' }).on('change', function callBackChange(change) {
    console.log("updateLookup of Change :\n", change);   //just to see any operations done to database
});

//  INDEX   /gallery            GET     display all 
router.get('/', function(request, res, next) {
    Gallery.find({}, function callBackAll(err, pictures) {
        if (err) {
            console.log("Error:", err)
        } else {
            /* GET all gallerys list page . */
            res.render('index.ejs', { title: 'gallery', url: request.baseUrl, pictures: pictures });
        }
    });
});


//  SHOW    /gallerys/:id        GET     show more info info about one element in database
router.get("/:id", function callBackShowId(request, response, next){
    console.log("Request baseUrl:", request);
    const vbaseUrl="/";
    Gallery.findById(request.params.id, function callBackAll(err, foundpicture) {
        if (err) {
            console.log("Error:",request.params.id, err)
        } else {
            /* show what well we found with that Id . */
            response.render('show.ejs', { title: 'Found well', url: vbaseUrl, picture: foundpicture });
        }
    });
});




module.exports = router;

//************************************************************ */


//insert2Pictures();           //populate database with 2 defined wells
function insert2Pictures() {
    Gallery.create([{
        name: "Alamo Meek",
        image: "../images/2012.jpg",
        description:"My head Grigorescu picture"
    }, {
        name: "Balmo Geek",
        image: "../images/cata.jpg",
        description:"My son photo"
    }], function callBack(err, gallery) {
        if (err) {
            console.log("Error on create:", err);
        }
        else {
            console.log("Create: \n", gallery);
        }
    });
}

