"use strict";
let result = document.getElementById("result");
let targeth = document.getElementById("targeth");
let player1Score = document.getElementById("player1");
let player2Score = document.getElementById("player2");
let namePlayer1 = document.getElementById("namePlayer1");
let namePlayer2 = document.getElementById("namePlayer2");
let reset = document.getElementById("reset");


player1Score.textContent = 0;
player2Score.textContent = 0;
player1Score.addEventListener("click", function () {
    increment(this);
});
player2Score.addEventListener("click", function () {
    increment(this);
});
reset.addEventListener("click", function () {
    location.reload();
});

function increment(item) {
    item.textContent = parseInt(item.textContent) + 1;
    console.log(item.textContent, parseInt(targeth.textContent));
    if (item.textContent == parseInt(targeth.textContent)) {
        player1Score.disabled = true;
        player2Score.disabled = true;
        item.style.color = "green";
        let winner = namePlayer2.textContent;
        if (item.id == "player1") winner = namePlayer1.textContent;
        result.textContent = "Winner is " + winner;
        reset.style.display = "inline-block";
    }
};