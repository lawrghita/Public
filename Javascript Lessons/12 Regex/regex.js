"use strict";
myRegex(/ese|\s|ach|final/gi, "testanytyoeofspaces newlinese   TABis3SPACEScgnMetach\\n\nSecondLine\SinAnegationfinal");
myRegex(/test|\n|Sec/gi, "test new line secgnMetach\\n\nSecond Line sdsd");
myRegex(/(Met)|\t|final/g, "testMetacharacterTAB(\t)(\x09)final There are no horizontal(        )tabulation entities in HTML");
myRegex(/\D/g, "Metacharacter d represent not 0-9c = not digits");
myRegex(/\d/g, "Metacharacter d represent0-9c= digits");
myRegex(/\W/g, "Metacharacter W represent negation of  a-zA-z0-9_ = letters_numerals & underscore so #%$#^#@#$");
myRegex(/\w/g, "Metacharacter w represent a-zA-z0-9_ = letters_numerals & underscore so_not #%$#^#@#$");
myRegex(/./g, "Metacharacter . Point represent anything ");
myRegex(/cat|dog|or/gi, "Alternation or OR operator This cat is dog Thedog  test cat");
myRegex(/[ -~]/g, "chose All ASCI range from space ' ' to tilda '~'  %$543!@.,'';=<>{}\= table:");
myRegex(/[a-z]/g, "mach just vowels  pair from 222 because last pair have the middle 2 consumed");
myRegex(/[aeiouy]/g, "mach just vowels  pair from 222 because last pair have the middle 2 consumed");
myRegex(/22/, "mach just first pair from 222 because last pair have the middle 2 consumed");
myRegex(/22/g, "mach all pair from 2222 because first pair is consumed but remain also the second one");
myRegex(/literal match/, "This  check literal match literal");
myRegex(/the/, "This is The thext test");
myRegex(/th/, "This is Theth test");
myRegex(/(?<=<).*?(?=>)/g, " Return whats betwen <brackets> thet <ea>regexp");

// v = new RegExp(/22/, 'g');
// console.log(v, v.exec("22 22"), "22 22".match(v));
//
// var vcode = document.querySelectorAll(".code");
// let vinput = document.querySelectorAll(".input");
// let vresult = document.querySelectorAll(".result");


function myRegex(vFcode, vFinput) {
    let newDiv = document.createElement("div");
    newDiv.className = "code";
    newDiv.textContent = vFcode;
    document.body.appendChild(newDiv);
    newDiv = document.createElement("div");
    newDiv.className = "input";
    newDiv.textContent = vFinput;
    document.body.appendChild(newDiv);
    newDiv = document.createElement("div");
    newDiv.className = "result";
    let result;
    result = vFinput.match(vFcode);
    newDiv.textContent = result;
    // console.log(result, result.index, result.length, result[0]);
    document.body.appendChild(newDiv);
    document.body.appendChild(document.createElement("br"));

}