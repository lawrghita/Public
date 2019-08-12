'use strict';
let rows = document.querySelector ('#rows');
const b = rows.getCom;
console.log (rows, 'back');
let cells = document.querySelectorAll ('.show');

const rgbQuestion = document.getElementById ('rgbQuestion');
const reset = document.getElementById ('reset');
const result = document.getElementById ('result');
const easy = document.getElementById ('easy');
const hard = document.getElementById ('hard');
let hardHide = document.querySelectorAll ('#hide td');
initialize ();

reset.addEventListener ('click', function () {
  initialize ();
});
easy.addEventListener ('click', function () {
  for (let index = 0; index < hardHide.length; index++) {
    hardHide[index].classList = 'show';
  }
  initialize ();
});
hard.addEventListener ('click', function () {
  for (let index = 0; index < hardHide.length; index++) {
    hardHide[index].classList = 'hide';
  }
  initialize ();
});

// ***.........
function correct () {
    //** on correct guess, display CORRECT on middle and make all squares that color */
  result.textContent = 'CORRECT';
  cells.forEach (cell => {
    cell.style.backgroundColor = rgbQuestion.textContent;
  });
}

function actionClick () {
  const rgbClicked = this.style.backgroundColor.toUpperCase ();
  if (rgbClicked === rgbQuestion.textContent) correct ();
  else {
    result.textContent = 'Try Again';
    this.style.backgroundColor = getComputedStyle (rows).backgroundColor;
  }
}
function initialize () {
  //** restart all colors */
  cells = document.querySelectorAll ('.show');
  result.textContent = '';
  for (let index = 0; index < cells.length; index++) {
    const randRed = Math.round (Math.random () * 255);
    const randGreen = Math.round (Math.random () * 255);
    const randBlue = Math.round (Math.random () * 255);
    cells[index].style =
      'background-color:rgb(' +
      randRed +
      ', ' +
      randGreen +
      ', ' +
      randBlue +
      ');';
    cells[index].addEventListener ('click', actionClick);
  }
  console.log ('cells', cells);
  choseRandomOneSquareRGB (cells);
}
function choseRandomOneSquareRGB (cells) {
  const answerCell = Math.floor (Math.random () * cells.length);
  const randRed = cells[answerCell].style.backgroundColor;
  rgbQuestion.textContent = randRed.toUpperCase ();
  return answerCell;
}
