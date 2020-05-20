"use strict";
const cTitle="Compgrounds X";

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Campground = require('../models/campgroundSchema.js');
var Comment = require('../models/comments.js')

var RandomDataObject = require('../middleware/randomdata');
const loremIpsum = require("lorem-ipsum").loremIpsum;
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 4,
        min: 2
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
const coolImages = require("cool-images");


const expressSanitizer = require('express-sanitizer');
router.use(expressSanitizer());


require('dotenv').config();
const utilizator = process.env['UTILIZATOR'];
const parola = process.env['PAROLA'];
let uri = `mongodb+srv://${utilizator}:${parola}@cluster0-8s7vx.gcp.mongodb.net/campgrounds?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function check(err){
    if (err) {
        console.log(err);
        throw(err);
    }
});


//console.log(RandomDataObject.title, RandomDataObject.image, RandomDataObject.body);

Campground.watch({ fullDocument: 'updateLookup' }).on('change', function callBackChange(change) {
    console.log("updateLookup of Change :\n", change);   //just to see any operations done to database
});


/* GET home page. */
router.get('/', function (request, res, next) {
    Campground.find({}, function callBackAll(err, campgrounds) {
        if (err) {
            console.log("Error:", err);np
        } else {
            /* GET all  page . */
            res.render('campgrounds.ejs', { title: cTitle, url: request.baseUrl, pictures: campgrounds });
        }
    });
});

router.get("/new", function callbackNew(request, result) {

    // Put some random value to see exactly the use of space
    setTimeout(function () {
        const height = Math.floor(Math.random() * 800) + 300; // returns a random integer from 1 to 100
        const width = Math.floor(Math.random() * 1024) + 400;
        var RandomDataObject = {
            name: loremIpsum(),
            image: coolImages.one(height, width), // 'https://unsplash.it/300/500?image=125'
            description: lorem.generateParagraphs(3),
        };

        var name = RandomDataObject.name;
        var image = RandomDataObject.image;
        var description = RandomDataObject.description;
        /// and also put a wait timer for 4 seconds to slow the submit speed click exploit
        console.log("Random", name);
        const welcomeMESSAGE = "New random camp";
        //if (userFirstNow.toString().slice(0, 15) !== 'Thu Jan 01 1970') {
        //    welcomeMESSAGE = "Bot protection: 4 seconds pause on new posts, your posts are deleted after 5 min. <p> Html accepted on post body. Perfect mobile & navigation." + " <p> Delete between (" + userFirstNow.toUTCString().slice(0, 25) + " and " + dateAfterDelete.toUTCString().slice(0, 25) + ")";
        //} else {
        //    welcomeMESSAGE = "Bot protection: 4 seconds pause on new posts, your posts are deleted after 5 min. <p> Html accepted on post body. Perfect mobile & navigation.";
        //}
        result.render("new.ejs", { title:' Insert New', name: name, image: image, description: description, welcomeMESSAGE: welcomeMESSAGE });
    }, 3000);
});


// DELETE   /blogs/:id      DELETE  Delete a post with id
router.delete("/:id", function callbackPost(request, result) {
    // delete just the new one after the dateAfterDelete
    Campground.deleteOne({ _id: request.params.id }, function callBackAfterDeletion(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted", request.params.id);
        }
        result.redirect("/campgrounds");
    });
});


// Error Cast to ObjectId failed for value "any value" at path "_id" for model "Campground"
// because /:id route must be the last route processed
//  SHOW    /campgrounds/:id        GET     show more info info about one element in database
router.get("/:id", function callBackShowId(request, response, next) {
    //  console.log("Request baseUrl:", request);
    const vbaseUrl = request.baseUrl;
    Campground.findById(request.params.id, function callBackAll(err,foundCamp) {
        if (err) {
            console.log("Error:", request.params.id, err)
        } else {
            /* show what well we found with that Id . */
            response.render('show.ejs', { title: 'Found well', url: vbaseUrl, camp:foundCamp });
        }
    });
});




router.post("/", function callbackPost(request, result) {
    // 'Campground[body]'  is the name of the DOM element
    const sanitizedBody = request.sanitize(request.body['Campground[description]']);
     console.log("Sanitize NEW: \n", sanitizedBody);
    var dataFromPost = {
        name: request.body['Campground[name]'],
        image: request.body['Campground[image]'],
        description: sanitizedBody
    };
    //// normal is just:
    //// Blog.create(dataFromPost, function (err, newBLog) {result.redirect("/blogs");});
    /////// but if is in public domain (production) I must
    /////// temporary deleting the oldest post so the database is not filled by bots

    ////.... the display is refreshed before redirect
    Campground.create(dataFromPost, function (err, newCamp) {
        if (err) {
            console.log("Error ", err);
        } else {
            Comment.create(
                {text:"Empty comment",author: "Empty Author" }, 
                function callBackCommentInit(err, comment){
                    if (err) {
                        console.log('Callbackcommenterr',err);
                    } else {
                        newCamp.comments.push(comment);
                        newCamp.save();
                    }
                }
            );
            console.log(newCamp);
           // userFirstNow = newCamp.created;
           // userFirstNow.setMinutes(userFirstNow.getMinutes() - 5);
           //  console.log("App userFirstEntryOnServerD", userFirstNow, Date(0), userFirstNow.toString(), userFirstNow.toUTCString());
            // }
            console.log("/campgrounds#" + newCamp.id);
            result.redirect("/campgrounds#" + newCamp.id);
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