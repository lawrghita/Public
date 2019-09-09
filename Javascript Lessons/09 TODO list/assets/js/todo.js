let version = document.querySelector("#version");
const time = document.lastModified;
version.textContent = "v.0.10 ";
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

$("li").click(function() {
$(this).toggleClass("completed");
  console.log("1:", $(this), $(this).css("color"), $(this).css("font"));
});
