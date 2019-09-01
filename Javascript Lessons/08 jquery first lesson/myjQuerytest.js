// "use strict";
var purpleBackground={
    background: "purple"
}
var wide200={
    width: "200px"
}
var orangeBorder={
    border: "1px solid orange"
}
var fontPink={
    color: "pink"
}


// console.log($("div"));

$("div").css(purpleBackground);
$(".highlight").css(wide200);
$("#third").css(orangeBorder).css(fontPink);
$("div:first-of-type").css(fontPink);