"use strict";
let result = document.getElementById("result");
let target = document.getElementById("target");
let targetMinus = document.getElementById("target--");
let targetPlus = document.getElementById("target++");
let player1Score = document.getElementById("player1");
let player2Score = document.getElementById("player2");
let namePlayer1 = document.getElementById("namePlayer1");
let namePlayer2 = document.getElementById("namePlayer2");
let reset = document.getElementById("reset");

targetMinus.addEventListener("click", function () {
    if (parseInt(target.textContent) > 1) target.textContent--;
});
targetPlus.addEventListener("click", function () {
    target.textContent++;
});


player1Score.textContent = 0;
player2Score.textContent = 0;
player1Score.addEventListener("click", function () {
    increment(this);
});
player2Score.addEventListener("click", function () {
    increment(this);
});
reset.addEventListener("click", function () {
    location = window.location;
});

function increment(item) {
    targetMinus.disabled = true;
    targetPlus.disabled = true;
    item.textContent = parseInt(item.textContent) + 1;
    console.log(item.textContent, parseInt(target.textContent));
    if (item.textContent == parseInt(target.textContent)) {
        player1Score.disabled = true;
        player2Score.disabled = true;
        item.style.color = "green";
        let winner = namePlayer2.textContent;
        if (item.id == "player1") winner = namePlayer1.textContent;
        result.textContent = "Winner is " + winner;
        reset.style.display = "inline-block";
    }
}
