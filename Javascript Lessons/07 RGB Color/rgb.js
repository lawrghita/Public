"use strict";
let cells = document.querySelectorAll('.show');
const rgbQuestion = document.getElementById("rgbQuestion");
const reset = document.getElementById("reset");
const easy = document.getElementById("easy");
const hard = document.getElementById("hard");
let hardHide = document.querySelectorAll("#hide td");

initialize();

reset.addEventListener('click', function () {
    console.log(this);
    initialize();
});
easy.addEventListener('click', function () {
    for (let index = 0; index < hardHide.length; index++) {
        hardHide[index].classList = "show";
    }
    initialize();
});
hard.addEventListener('click', function () {
    for (let index = 0; index < hardHide.length; index++) {
        hardHide[index].classList = "hide";
    }
    initialize();
});

// ***.........

function initialize() {
    cells = document.querySelectorAll('.show');
    cells.forEach(function (item, index) {
        const randRed = Math.round((Math.random() * 255));
        const randGreen = Math.round((Math.random() * 255));
        const randBlue = Math.round((Math.random() * 255));
        item.style = "background-color:rgb(" + randRed + ", " + randGreen + ", " + randBlue + ");";
        item.innerHTML = index + "<p>" + randRed + ", " + randGreen + ", " + randBlue;
        // console.log('this', item);
    });
    console.log('cells', cells);
    // console.log('rgbQ', rgbQuestion);
    randomRGB();
}


function randomRGB() {
    const answerCell = Math.floor((Math.random() * cells.length));
    // console.log(answerCell, ":", cells.length-1);
    const randRed = cells[answerCell].style.backgroundColor;
    // console.log(":", randRed);
    rgbQuestion.textContent = randRed.toUpperCase();

}