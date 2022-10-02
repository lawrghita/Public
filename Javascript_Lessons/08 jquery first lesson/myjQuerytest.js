// "use strict";
// javascript objects:
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


var buttonRed = {
  mouseenter: function(event) {
    $(this).toggleClass("wrong");
  },
  mouseleave: function(event) {
    $(this).toggleClass("wrong");
  }
};

//console log tips
var looper;
console.time("looper");

console.log({wide200, wide500, fontPink});
console.table([wide200, wide500, orangeBorder, purpleBackground, fontPink]);


// effects  fadeToggle slideUp SlideDown
$("#effect").on("mouseenter",function () {
  $("span").fadeOut("slow");
}).on("mouseleave",function () {
  i=0; //strange reset, not reset on mouse stop
  $("span").fadeIn("slow", function () {
    i++; //
    console.log("inside a callback wait and executed after fadein"+i);
    // $(this).remove(); //disapear till reload of page

  });
});

// on()
$("h2").on("click", function() {
  $(this).css("color", "red");
});

$("input").on("keypress", function(event) {
  console.log("On + keypress :", event);
});

// $("button")
//   .on("mouseenter", function(event) {
//     $(this).toggleClass("wrong");
//   })
//   .on("mouseleave", function(event) {
//     $(this).toggleClass("wrong");
//   });
// equivalent with that but using objects already definited:
$("button").on(buttonRed);   // apply an object declared before 
$("h1").on(buttonRed);

//Keypressed;
$("input").keypress(function(event) {
  console.log("keypress handler press ", this.value); //display the old value
  console.log(event, " keypress handler Cod of the pressed key:", event.which);
  if (event.which === 13) {
    $("li")
      .first()
      .text(this.value)
      .addClass("done");
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
  console.log(this, " Input change method... Typed:", this.value);
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

console.timeEnd("looper");