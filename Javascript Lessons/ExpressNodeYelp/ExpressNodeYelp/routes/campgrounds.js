'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Campground = require('../models/campgroundSchema');
var RandomDataObject = require('../middleware/randomdata');


const expressSanitizer = require('express-sanitizer');
router.use(expressSanitizer());


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

router.get("/new", function callbackNew(request, result) {
    // Put some random value to see exactly the use of space
    const title = RandomDataObject.title;
    const image = RandomDataObject.image; // 'https://unsplash.it/300/500?image=125'
    const body = RandomDataObject.body;
    /// and also put a wait timer for 4 seconds to slow the submit speed click exploit
    setTimeout(function () {
       const welcomeMESSAGE = "New random camp"
        //if (userFirstNow.toString().slice(0, 15) !== 'Thu Jan 01 1970') {
        //    welcomeMESSAGE = "Bot protection: 4 seconds pause on new posts, your posts are deleted after 5 min. <p> Html accepted on post body. Perfect mobile & navigation." + " <p> Delete between (" + userFirstNow.toUTCString().slice(0, 25) + " and " + dateAfterDelete.toUTCString().slice(0, 25) + ")";
        //} else {
        //    welcomeMESSAGE = "Bot protection: 4 seconds pause on new posts, your posts are deleted after 5 min. <p> Html accepted on post body. Perfect mobile & navigation.";
        //}
        result.render("new.ejs", { title: title, image: image, body: body, welcomeMESSAGE: welcomeMESSAGE })
    }, 3000);
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


router.post("/", function callbackPost(request, result) {
    // 'blog[body]'  is the name of the DOM
    const sanitizedBody = request.sanitize(request.body['blog[body]']);
    // console.log("Sanitize NEW: \n", sanitizedBody);
    var dataFromPost = {
        title: request.body['blog[title]'],
        image: request.body['blog[image]'],
        body: sanitizedBody,
        created: Date.now()
    };
    //// normal is just:
    //// Blog.create(dataFromPost, function (err, newBLog) {result.redirect("/blogs");});
    /////// but if is in public domain (production) I must
    /////// temporary deleting the oldest post so the database is not filled by bots

    ////.... the display is refreshed before redirect
    Blog.create(dataFromPost, function (err, newBLog) {
        if (err) {
            console.log("Eroare", err);
        } else {

            userFirstNow = newBLog.created;
            userFirstNow.setMinutes(userFirstNow.getMinutes() - 5);
            //  console.log("App userFirstEntryOnServerD", userFirstNow, Date(0), userFirstNow.toString(), userFirstNow.toUTCString());

            // }
            result.redirect("/blogs");
            //deleteOldestPostAndRedirect(result);
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