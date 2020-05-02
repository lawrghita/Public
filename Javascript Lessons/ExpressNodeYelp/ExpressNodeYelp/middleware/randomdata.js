
//// random area fillers
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

var RandomDataObject = {
     title: loremIpsum(),
     image: coolImages.one(), // 'https://unsplash.it/300/500?image=125'
     body: lorem.generateParagraphs(3),
}


module.exports = RandomDataObject;
