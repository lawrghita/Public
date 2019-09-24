myRegex(/[a-z]/g, "mach just vowels  pair from 222 because last pair have the middle 2 consumed");
myRegex(/[aeiouy]/g, "mach just vowels  pair from 222 because last pair have the middle 2 consumed");
myRegex(/22/, "mach just first pair from 222 because last pair have the middle 2 consumed");
myRegex(/22/g, "mach all pair from 2222 because first pair is consumed but remain also the second one");
myRegex(/literal match/, "This  check literal match literal");
myRegex(/the/, "This is The thext test");
myRegex(/th/, "This is Theth test");
myRegex(/(?<=<).*?(?=>)/g, " Return whats betwen <brackets> thet <ea>regexp");

v = new RegExp(/22/, 'g');
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
    result = vFinput.match(vFcode);
    newDiv.textContent = result;
    console.log(result, result.index, result.length, result[0]);
    document.body.appendChild(newDiv);
    document.body.appendChild(document.createElement("br"));

}