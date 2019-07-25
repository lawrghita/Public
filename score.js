"use strict";
let result = document.getElementById("result");
let player1Score = document.getElementById("player1");
let player2Score = document.getElementById("player2");
let namePlayer1 = document.getElementById("namePlayer1");
let namePlayer2 = document.getElementById("namePlayer2");


player1Score.textContent=0;
player2Score.textContent=0;
player1Score.addEventListener("click",function(){
    increment(this);
});
player2Score.addEventListener("click",function(){
    increment(this);
});

function increment(item){
    item.textContent=parseInt(item.textContent)+1;
    if (item.textContent == 3){
        item.style.color = "green";
        let winner = namePlayer2.textContent;
        if (item.id=="player1") winner = namePlayer1.textContent;
        result.textContent="Winner is "+winner;

    }
};
