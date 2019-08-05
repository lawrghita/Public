"use strict";
let cells = document.querySelectorAll('.show');;
//  document.querySelectorAll('.show');
const rgbQuestion = document.getElementById("rgbQuestion");
const reset = document.getElementById("reset");
const result = document.getElementById("result");
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
function correct() {
    result.textContent = 'CORRECT';
    cells.forEach(cell => {
        cell.style.backgroundColor = rgbQuestion.textContent;
        console.log('set', cell.style.backgroundColor);
    });
}
function error() {


}
function vclick() {
    const rgbClicked = this.style.backgroundColor.toUpperCase();
    console.log('clicked', this, rgbClicked, rgbQuestion.textContent);
    if (rgbClicked === rgbQuestion.textContent) correct();
    else {
        result.textContent = 'Try Again';
        this.style.backgroundColor = 'black';
    }
}
function initialize() {
    cells = document.querySelectorAll('.show');
    result.textContent = '';
    for (let index = 0; index < cells.length; index++) {
        const randRed = Math.round((Math.random() * 255));
        const randGreen = Math.round((Math.random() * 255));
        const randBlue = Math.round((Math.random() * 255));
        cells[index].style = "background-color:rgb(" + randRed + ", " + randGreen + ", " + randBlue + ");";
        cells[index].innerHTML = index + "<p>" + randRed + ", " + randGreen + ", " + randBlue;
        cells[index].addEventListener('click', vclick);
    }
    console.log('cells', cells);
    randomRGB(cells);
}
function randomRGB(cells) {
    const answerCell = Math.floor((Math.random() * cells.length));
    const randRed = cells[answerCell].style.backgroundColor;
    rgbQuestion.textContent = randRed.toUpperCase();
    console.log("Index for the random color: ", answerCell);
    return answerCell;
}