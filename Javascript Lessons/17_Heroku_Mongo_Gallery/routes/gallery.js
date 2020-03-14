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
            res.render('gallery.ejs', { title: 'My gallery', url: request.baseUrl, pictures: pictures });
        }
    });
});


//  SHOW    /gallerys/:id        GET     show more info info about one element in database
router.get("/:id", function callBackShowId(request, response, next){

  //  console.log("Request baseUrl:", request);
    const vbaseUrl=request.baseUrl;
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


insertPictures();           //populate database with 2 defined wells
function insertPictures() {
    Gallery.collection.drop();
    Gallery.create([{
        name: "Detaliu tablou",
        image: "../images/2012.jpg",
        description:"Detaliu reproducere tablou în ulei Nicolae Grigorescu"
    },{
        name: "Arcaș",
        image: "../images/arcas76nd_2_.jpg",
        description:"Studiu concept arc desenat cu tabletă în programul Artrage"
    },{
        name: "Concept oraș",
        image: "../images/askyriver1.jpg",
        description:"Digital desenat cu tabletă cu programul Artrage"
    },{
        name: "Avatar",
        image: "../images/avatar800_copy.jpg",
        description:"Desen în creion schiță de afiș"
    },{
        name: "Coperta",
        image: "../images/AvionulNazdravan1979859-0.jpeg",
        description:"Toate ilustrațiile din interior și coperțile cărții făcute în Artrage "
    }], function callBack(err, gallery) {
        if (err) {
            console.log("Error on create:", err);
        }
        else {
            console.log("Create: \n", gallery);
        }
    });
}

