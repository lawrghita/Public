"use strict";
/** Service Worker area ACTIVATED*/
if ("serviceWorker" in navigator) {
  console.log("YES serviceWorker activated in " + navigator.appCodeName);
  navigator.serviceWorker
    .register("sw.js", {
      scope: "./"
    })
    .then(reg => {
      // registration worked
      console.log("Registration succeeded. Scope is " + reg.scope);
    })
    .catch(error => {
      // registration failed
      console.log("Registration failed with " + error);
    });
} else {
  console.log("No serviceWorker activated in " + navigator.appCodeName);
}

//** Simple Workers area - for async  */

// if (window.Worker) {
//     //** Setting up an worker */
//     console.log(window.Worker, " Worker active");
//     var worker = new Worker('doWork.js');
//     worker.onerror = function (error) {
//         console.log('Worker error: ' + error.message + '\n');
//         throw error;
//     };
//     worker.onmessage = function (e) {
//         console.log('Message received from worker ', e.data);
//     }
//     worker.postMessage('BAAB'); // Send data to our worker
//     worker.postMessage('ABBA'); // Send data to our worker
//     // worker.terminate(); //Terminate the worker instant
// } else {
//     console.log(window.Worker, " Worker inactive");
// }

const correctGuessMessage = "CORRECT";
const choseText = "CHOSE NOW:";
const newColors = "REFRESH ?";
let rows = document.querySelector("#rows");
let cells = document.querySelectorAll(".show");
const banner = document.querySelector("#banner");
const rgbQuestion = document.getElementById("rgbQuestion");
const reset = document.getElementById("reset");
const result = document.getElementById("result");
const easy = document.getElementById("easy");
const hard = document.getElementById("hard");
let hardHide = document.querySelectorAll("#hide td");
const bannerBackgroundColor = getComputedStyle(banner).backgroundColor;

initialize();

reset.addEventListener("click", function() {
  //** Inactivate the reset till the correct color is chosen  */
  if (result.textContent == correctGuessMessage) {
    initialize();
  }
});
reset.addEventListener("mouseover", function() {
  if (result.textContent == correctGuessMessage) {
    this.classList.remove("normalLineElement");
    this.classList.add("gameType");
  }
});
reset.addEventListener("mouseout", function() {
  this.classList.add("normalLineElement");
  this.classList.remove("gameType");
});

easy.addEventListener("click", function() {
  for (let index = 0; index < hardHide.length; index++) {
    hardHide[index].classList = "hide";
  }
  this.classList.add("gameType");
  this.classList.remove("normalLineElement");
  hard.classList.remove("gameType");
  hard.classList.add("normalLineElement");
  initialize();
});

hard.addEventListener("click", function() {
  for (let index = 0; index < hardHide.length; index++) {
    hardHide[index].classList = "show";
  }
  this.classList.add("gameType");
  this.classList.remove("normalLineElement");
  easy.classList.remove("gameType");
  easy.classList.add("normalLineElement");
  initialize();
});

// ***.........
function correct() {
  "use strict";
  //** on correct guess, display CORRECT on middle and make all squares that color */
  result.textContent = correctGuessMessage;
  reset.textContent = newColors;
  cells.forEach(cell => {
    cell.style.backgroundColor = rgbQuestion.textContent;
  });
  rgbQuestion.style.backgroundColor = rgbQuestion.textContent;
}

function actionClick() {
  "use strict";
  const rgbClicked = this.style.backgroundColor.toUpperCase();
  if (rgbClicked === rgbQuestion.textContent) correct();
  else {
    //** chose color on air */
    this.style.backgroundColor = getComputedStyle(rows).backgroundColor;
  }
}

function initialize() {
  "use strict";
  //** restart all colors */
  rgbQuestion.style.backgroundColor = bannerBackgroundColor;
  cells = document.querySelectorAll(".show");
  result.textContent = "";
  reset.textContent = choseText;
  reset.classList.add("normalLineElement");
  for (let index = 0; index < cells.length; index++) {
    const randRed = Math.round(Math.random() * 255);
    const randGreen = Math.round(Math.random() * 255);
    const randBlue = Math.round(Math.random() * 255);
    cells[index].style =
      "background-color:rgb(" +
      randRed +
      ", " +
      randGreen +
      ", " +
      randBlue +
      ");";
    cells[index].addEventListener("click", actionClick);
  }
  choseRandomOneSquareRGB(cells);
}

function choseRandomOneSquareRGB(cells) {
  "use strict";
  const answerCell = Math.floor(Math.random() * cells.length);
  const randRed = cells[answerCell].style.backgroundColor;
  rgbQuestion.textContent = randRed.toUpperCase();
  return answerCell;
}
