'use strict';
let rows = document.querySelector('#rows');
let cells = document.querySelectorAll('.show');
const banner = document.querySelector('#banner');
const rgbQuestion = document.getElementById('rgbQuestion');
const reset = document.getElementById('reset');
const result = document.getElementById('result');
const easy = document.getElementById('easy');
const hard = document.getElementById('hard');
let hardHide = document.querySelectorAll('#hide td');
const hoverable = document.querySelectorAll('.hover');

const bannerBackgroundColor = getComputedStyle(banner).backgroundColor;
initialize();

reset.addEventListener('click', function() {
    initialize();
});
hard.addEventListener('click', function() {
    for (let index = 0; index < hardHide.length; index++) {
        hardHide[index].classList = 'show';
    }
    initialize();
});
easy.addEventListener('click', function() {
    for (let index = 0; index < hardHide.length; index++) {
        hardHide[index].classList = 'hide';
    }
    initialize();
});

hoverable.forEach(element => {
    const lineTextColor = getComputedStyle(element).color;
    element.addEventListener('click', function() {
        element.style.backgroundColor = getComputedStyle(banner).backgroundColor;
    });
    element.addEventListener('mouseover', function() {
        element.style.backgroundColor = getComputedStyle(banner).backgroundColor;
        element.style.color = 'white';
    });
    element.addEventListener('mouseout', function() {
        element.style.backgroundColor = "white";
        element.style.color = lineTextColor;
    });
});

// ***.........
function correct() {
    'use strict';
    //** on correct guess, display CORRECT on middle and make all squares that color */
    result.textContent = 'CORRECT';
    cells.forEach(cell => {
        cell.style.backgroundColor = rgbQuestion.textContent;
    });
    banner.style.backgroundColor = rgbQuestion.textContent;
}

function actionClick() {
    'use strict';
    const rgbClicked = this.style.backgroundColor.toUpperCase();
    if (rgbClicked === rgbQuestion.textContent) correct();
    else {
        result.textContent = 'Try Again';
        //** chose color on air */
        this.style.backgroundColor = getComputedStyle(rows).backgroundColor;
    }
}
function initialize() {
    'use strict';
    //** restart all colors */
    banner.style.backgroundColor = bannerBackgroundColor;
    cells = document.querySelectorAll('.show');
    result.textContent = '';
    for (let index = 0; index < cells.length; index++) {
        const randRed = Math.round(Math.random() * 255);
        const randGreen = Math.round(Math.random() * 255);
        const randBlue = Math.round(Math.random() * 255);
        cells[index].style =
            'background-color:rgb(' +
            randRed +
            ', ' +
            randGreen +
            ', ' +
            randBlue +
            ');';
        cells[index].addEventListener('click', actionClick);
    }
    choseRandomOneSquareRGB(cells);
}
function choseRandomOneSquareRGB(cells) {
    'use strict';
    const answerCell = Math.floor(Math.random() * cells.length);
    const randRed = cells[answerCell].style.backgroundColor;
    rgbQuestion.textContent = randRed.toUpperCase();
    return answerCell;
}
