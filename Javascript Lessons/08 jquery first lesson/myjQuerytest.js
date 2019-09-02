// "use strict";
var purpleBackground = {
  background: "purple"
};
var wide200 = {
  width: "200px"
};
var wide500 = {
  width: "500px"
};
var orangeBorder = {
  border: "1px solid orange"
};
var fontPink = {
  color: "pink"
};

//Keypressed;
$("input").keypress(function(event) {
  console.log("keypress handler press " + this.value); //display the old value
  console.log(event);
  console.log("keypress handler Cod of the pressed key:" + event.which);
  if (event.which === 13) {
   $("li").first().text(this.value).addClass("done");
  }
});

$("input").keyup(function() {
  // the same as .on()
  console.log("keyup callback handler press " + this.value); // display the current value
});

// Events
$("button").click(function() {
  alert("Pressed:" + this.textContent);
  $(this).toggleClass("correct"); // equivalent of this. from javascript
  console.log("Clicked:" + $(this).text());
});
$("input").change(function() {
  console.log(this);
  console.log(" Input change method... Typed:" + this.value);
});

// answer for a student question
// var btn = document.querySelectorAll("button");
// btn[0].addEventListener("click", function () {
//     for (let index = 0; index < btn.length; index++) {
//         console.log("but cloc"+this.textContent+" "+index);
//     }
// })

// Second Exercise change atributes with jQuery
$("img").attr(
  "src",
  "/Javascript Lessons/08 jquery first lesson/images/DSC06083.jpg"
);
$("img").css(wide200); // all
$("img")
  .last()
  .css(wide500); //doar ultima

$("input").attr("placeholder", "changed name");
console.log($("input").val()); // not working because is triggered just once at reload

$("li")
  .first()
  .addClass("correct");
$("li")
  .first()
  .toggleClass("correct");
$("li")
  .eq(1)
  .addClass("wrong"); //modify the second (x-1) from the list
$("li")
  .eq(2)
  .addClass("correct");
$("li")
  .last()
  .addClass("done"); // its the last of all ... html end

console.log($("li")[2]);

// First Exercise
$("div").css(purpleBackground);
$(".highlight").css(wide200);
$("#third")
  .css(orangeBorder)
  .css(fontPink);
$("div:first-of-type").css(fontPink);
