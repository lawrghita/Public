"use strict";
const cells = document.querySelectorAll('td');
const rgbQuestion =  document.getElementById("rgbQuestion");


initialize();


// ***.........

function initialize() {
    cells.forEach(function (item) {
        const randRed = Math.round((Math.random() * 255));
        const randGreen = Math.round((Math.random() * 255));
        const randBlue = Math.round((Math.random() * 255));
        item.style = "background-color:rgb(" + randRed + ", " + randGreen + ", " + randBlue + ");";
        item.innerHTML = item.textContent + "<p>" + randRed + ", " + randGreen + ", " + randBlue;
        // console.log('this', item);
    });
    console.log('cell', cells);
    console.log('rgbQ', rgbQuestion);
    randomRGBEasy();
}


function randomRGBEasy() {
    const answerCell = Math.round((Math.random() * cells.length));
    const randRed = cells[answerCell].style.backgroundColor;
    rgbQuestion.textContent = randRed.toUpperCase();
    console.log(answerCell + 1, ":", randRed);
 }