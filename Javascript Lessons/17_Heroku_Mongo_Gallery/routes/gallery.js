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
    },{
        name: "Acuarelă",
        image: "../images/bi_10_15_2010_2_07_26_pm_10_8_.jpg",
        description:"Carton A3"
    },{
        name: "Creion",
        image: "../images/catedrala_vilcea_4_.jpg",
        description:"Moleskine A6"
    },{
        name: "Chip",
        image: "../images/chip_4_.jpg",
        description:"Desen A4 după poză"
    },{
        name: "Medic",
        image: "../images/color_starcraft_thumb_3_.jpg",
        description:"Concept pentru femeie medic starcraft"
    },{
        name: "Copertă 1995",
        image: "../images/declinul-occidentului-vol-i-ii-de-oswald-spengler-1996-p59656-0.jpg",
        description:"Copertă în paint și thenoredactare făcute în Microsoft Word 95"
    },{
        name: "Detaliu intermediar",
        image: "../images/detaliumareromace_4_.jpg",
        description:"Un stadiu intermediar pentru o lucrare mai mare digitală"
    },{
        name: "Concept aeroglisor",
        image: "../images/digital_artrage_hover_800.jpg",
        description:"Digital în artrage, studiu de reflexii"
    },{
        name: "Master & Slave",
        image: "../images/dw_sketch_11_18_2010_5_00_05_pm_1244x1640_4_.jpg",
        description:"Concept personaje stâpân sclav"
    },{
        name: "Nekermann 1992",
        image: "../images/fatablonda.jpg",
        description:"Tablou în ulei pictat în facultate după un catalog de modă"
    },{
        name: "Concept călăreț",
        image: "../images/girafa_calare_4_.jpg",
        description:"A3 desen în creion"
    },{
        name: "Studiu lumină",
        image: "../images/giraffe_5_.jpg",
        description:"A3 desen în creion pentru senzația de lumină prin lipsă"
    },{
        name: "Reproducere 1994 Frigorescu",
        image: "../images/grigorescu.jpg",
        description:"Tablou foarte vechi, aveam spațiu de lucru pe atunci"
    },{
        name: "Școala de Artă Traian Demetrescu Secția Grafică Pictură",
        image: "../images/headsculpt_4_.jpg",
        description:"Tablou în ulei pe carton lucrarea de absolvire pentru expoziția absolveților 3 ani pictură"
    },{
        name: "Ilustrație copertă carte",
        image: "../images/imagine0808_thumb_1_.jpg",
        description:"Ilustrație de copertă în creion carte studii doctorat - influența ocupației turcești asupra obiceiurilor țărancelor române"
    },{
        name: "Test ilustrație alb/negru",
        image: "../images/inck_head_thumb_2_.jpg",
        description:"Studiu alb negru, spațiu negativ"
    },{
        name: "Detaliu",
        image: "../images/message3detaliu_4_.jpg",
        description:"Detaliu dintr-o ilustrație neterminată"
    },{
        name: "Stadiu intermediar",
        image: "../images/message6_4_.jpg",
        description:"Toată lucrarea digitală, stadiu actual"
    },{
        name: "Concept Roadster",
        image: "../images/moto_5_22_2010_12_04_39_am_2088x1584_5_.jpg",
        description:"Ca model șasiu de Tatra"
    },{
        name: "Pastel",
        image: "../images/pastelgirlreloaded_5_.jpg",
        description:"Cărbune colorat"
    },{
        name: "Artrage",
        image: "../images/rage.jpg",
        description:"Studiu de desen nuanțe gri"
    },{
        name: "Grafică SF",
        image: "../images/roketlunch_4_.jpg",
        description:"Desen făcut cu trusă Rotring"
    },{
        name: "Desen creion",
        image: "../images/shark_8_.jpg",
        description:"Studiu în creion"
    },{
        name: "Concept",
        image: "../images/sniper_apocaliptic.jpg",
        description:"Făcut în Artrage"
    },{
        name: "Desen A3",
        image: "../images/the_land_of_zendikar_4_.jpg",
        description:"Studiu peisagistic monumental"
    }], function callBack(err, gallery) {
        if (err) {
            console.log("Error on create:", err);
        }
        else {
            console.log("Create: \n", gallery);
        }
    });
}

