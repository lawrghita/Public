"use strict";
const cTitle = "Campgrounds X";

var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Campground = require("../models/campgroundSchema.js");
var Comment = require("../models/comments.js");

var RandomDataObject = require("../middleware/randomdata");
const loremIpsum = require("lorem-ipsum").loremIpsum;
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
const authorRandom = new LoremIpsum({
  sentencesPerParagraph: {
    max: 1,
    min: 1,
  },
  wordsPerSentence: {
    max: 1,
    min: 1,
  },
});

const coolImages = require("cool-images");

const expressSanitizer = require("express-sanitizer");
router.use(expressSanitizer());

require("dotenv").config();
const utilizator = process.env["UTILIZATOR"];
const parola = process.env["PAROLA"];
let uri = `mongodb+srv://${utilizator}:${parola}@cluster0-8s7vx.gcp.mongodb.net/campgrounds?retryWrites=true&w=majority`;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function check(err) {
    if (err) {
      console.log(err);
      throw err;
    }
  }
);

//console.log(RandomDataObject.title, RandomDataObject.image, RandomDataObject.body);

Campground.watch({ fullDocument: "updateLookup" }).on(
  "change",
  function callBackChange(change) {
    console.log("updateLookup of Change :\n", change); //just to see any operations done to database
  }
);
Comment.watch({ fullDocument: "updateLookup" }).on(
  "change",
  function callBackChange(change) {
    console.log("updateLookup of Change :\n", change); //just to see any operations done to database
  }
);

/* GET home page. */
router.get("/", function (request, res, next) {
  Campground.find({}, function callBackAll(err, campgrounds) {
    if (err) {
      console.log("Error:", err);
      np;
    } else {
      /* GET all  page . */
      res.render("campgrounds.ejs", {
        title: cTitle,
        url: request.baseUrl,
        pictures: campgrounds,
      });
    }
  });
});

// NEW define FORM for new campground
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
    result.render("new.ejs", {
      title: " Insert New",
      name: name,
      image: image,
      description: description,
      welcomeMESSAGE: welcomeMESSAGE,
    });
  }, 3000);
});

// DELETE   /blogs/:id      DELETE  Delete a post with id
router.delete("/:id", function callbackPost(request, result) {
  const deleteId = request.params.id;
  Campground.findOne({ _id: deleteId }, function callBackAfterFinding(
    err,
    camp
  ) {
    if (err) {
      console.log(err);
    } else {
      camp.comments.forEach((element) => {
        Comment.deleteOne({ _id: element._id }, function callBackAfterDeletion(
          err
        ) {
          if (err) {
            console.log(err);
          } else {
            console.log("Deleted from comment", element._id);
          }
        });
      });
      Campground.deleteOne({ _id: deleteId }, function callBackAfterDeletion(
        err
      ) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted", deleteId);
        }
        result.redirect("/campgrounds");
      });
    }
  });
});

// Error Cast to ObjectId failed for value "any value" at path "_id" for model "Campground"
// because /:id route must be the last route processed

//  SHOW    /campgrounds/:id        GET     show more info info about one element in database
router.get("/:id", function callBackShowId(request, response, next) {
  //  console.log("Request baseUrl:", request);
  const vbaseUrl = request.baseUrl;
  Campground.findById(request.params.id, function callBackAll(err, foundCamp) {
    if (err) {
      console.log("Error:", request.params.id, err);
    } else {
      // populate the camp with data from comments
      //console.log(foundCamp.populated('comments'), foundCamp);
      /* show what camp we found with that Id . */
        response.render("show.ejs", {
        title: "Found well",
        url: vbaseUrl,
        camp: foundCamp,
      });
    }
  }).populate('comments');   //populate work just for queries
});

//  SHOW    /campgrounds/:id/newcomment        GET     show info with form for nw comment // reload show.ejs but with form integrated
router.get("/:id/newcomment", function callBackShowId(request, response, next) {
  //  console.log("Request baseUrl:", request);
  const vbaseUrl = request.baseUrl;
  Campground.findById(request.params.id, function callBackAll(err, foundCamp) {
    if (err) {
      console.log("Error:", request.params.id, err);
    } else {
      // populate the camp with data from comments for display
      //console.log(foundCamp.populated('comments'), foundCamp);
      /* show what camp we found with that Id . */
      const randText = loremIpsum();
      const randAuthor = "By " + authorRandom.generateParagraphs(1);

      response.render("shownewcomment.ejs", {
        title: "Found well",
        url: vbaseUrl,
        camp: foundCamp,
        text:randText,
        author: randAuthor
      });
    }
  }).populate('comments');   //populate work just for queries
});


//capture the data from newcomment FORM
router.post("/:id/newcomment", function callbackPost(request, result) {
  // 'Comments[text]'  is the name of the DOM element
  var dataFromPost = {
    text: request.body["Comments[text]"],
    author: request.body["Comments[author]"],
  };
  console.log("Request comment \n", request, dataFromPost);

  ////.... the display is refreshed before redirect
  Comment.create(dataFromPost, function (err, newComment) {
    if (err) {
      console.log("xxx Error Create Comment: ", err);
    } else {
      //TODO link comment to camp
      Campground.findById(request.params.id, function callBackAll(err, foundCamp) {
        if (err) {
          console.log("Error:", request.params.id, err);
        } else {
          foundCamp.comments.push(newComment);

          foundCamp.save(function aftersave(){
           // this callback of save will execute aftersave
            result.redirect("/campgrounds/" + request.params.id+"#lastComment");
          });
        }
      });
    }
  });
});



router.post("/", function callbackPost(request, result) {
  // 'Campground[body]'  is the name of the DOM element
  const sanitizedBody = request.sanitize(
    request.body["Campground[description]"]
  );
  console.log("Sanitize NEW: \n", sanitizedBody);
  var dataFromPost = {
    name: request.body["Campground[name]"],
    image: request.body["Campground[image]"],
    description: sanitizedBody,
  };
  ////.... the display is refreshed before redirect
  Campground.create(dataFromPost, function (err, newCamp) {
    if (err) {
      console.log("xxx Error Create Camp: ", err);
    } else {
      //adding2RandomComments(newCamp);
      //  console.log("x Added comments on:", newCamp);
      //  console.log("/campgrounds#" + newCamp.id);
      result.redirect("/campgrounds#" + newCamp.id);
    }
  });
});

module.exports = router;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//insertPictures();           //populate database with one camp
function insertPictures() {
  //Campground.collection.drop();
  Campground.create(
    [
      {
        name: RandomDataObject.title,
        image: RandomDataObject.image,
        description: RandomDataObject.body,
      },
    ],
    function callBack(err, campgrounds) {
      if (err) {
        console.log("Error on create:", err);
      } else {
        console.log("Create: \n", campgrounds);
      }
    }
  );
}


function adding2RandomComments(newCamp) {
  Comment.create(
    {
      text: loremIpsum(),
      author: "By " + authorRandom.generateParagraphs(1),
    },
    function callBackCommentInit(err, comment) {
      if (err) {
        console.log("Callbackcommenterr", err);
      } else {
        //Filling the new created camp with this random post for testing
        newCamp.comments.push(comment);
      }
      Comment.create(
        {
          text: loremIpsum(),
          author: "by " + authorRandom.generateParagraphs(1),
        },
        function callBackCommentInit(err, comment) {
          if (err) {
            console.log("Callbackcommenterr", err);
          } else {
            //Filling the new created camp with this random post for testing
            newCamp.comments.push(comment);
            newCamp.save( function callback(params) {
            //You can stop and wait do the save with a callback in save
            });
            /// CALLBACK HELL 4

            

          }
        }
      );
    }
  );
}