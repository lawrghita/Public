var version = document.querySelector("#version");
var time = document.lastModified;
version.textContent = "v.0.16 Fri ";
console.log(time);

// const colorClicked = "rgb(128, 128, 0)"; //set up color for TODOs finalized - gray?
// const liClicked = { color: colorClicked, "text-decoration": "line-through" };
// const liNormal = { color: "black", "text-decoration": "none" };
// $("li").click(function() {
//   // console.log("1:", $(this), $(this).css("color"), $(this).css("font"));
//   if ($(this).css("color") === colorClicked) {
//     // toggle between liNormal/liClicked
//     $(this).css(liNormal);
//   } else {
//     $(this).css(liClicked);
//   }
//   console.log(
//     "2:",
//     $(this),
//     $(this).css("color"),
//     $(this).css("text-decoration")
//   );
// });
// or

setEvents4TODO($("li"), $("span"));

$("input").on("keypress", function(event) {
  if (event.key === "Enter") {
    event.stopPropagation();
    var todoText = $(this).val();
    if ($("li:first-of-type").length !== 0) {
      $("<li><span>X</span> " + todoText + "</li>").insertBefore(
        "li:first-of-type"
      );
    } else {
      // all li deleted so insert an li into existed empty ul
      $("<li><span>X</span> " + todoText + "</li>").appendTo("ul"); // console.log($(this).val(), this.value, todoText, " ELSE LI first of type", $("li:first-of-type"));
    }
    setEvents4TODO($("li:first-of-type"), $("span:first-of-type"));
    this.value = "";
    // console.log($(this).val(), this.value, todoText, " LI first of type", $("li:first-of-type"));
  } //  console.log(this, event.key, $(this), " OldValue:", this.value, " Key:", event.key);
});

//==================

function setEvents4TODO(li, span) {
  li.click(function() {
    event.stopPropagation();
    $(this).toggleClass("completed");
  });

  span.click(function(event) {
    event.stopPropagation(); // the event do not pass to all parents
    // console.log("Clicked Remove",  $(this).parent().text());
    $(this)
      .parent()
      .fadeOut(800, function() {
        //callback function so wait for fadeOut function to finish
        // console.log("Fom call back", this, $(this).parent());
        $(this).remove(); // remove the entire line, parent of the span
      });
  });
}

function anothersolution() {
  // define an listener for an event click applied to all existent AND FUTURE LI inside an UL on BODY
  $("ul").on("click", "li", function() {
    $(this).toggleClass(completed);
  });
}
