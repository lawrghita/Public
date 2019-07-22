button = document.querySelector("button");
paragraph = document.querySelector("p");
console.log(button);
var nbClicked=1;
button.addEventListener("click",function(){
paragraph.textContent = button.textContent + " clicked "+nbClicked+" times";
nbClicked++;
});
// var original = true
// paragraph.addEventListener("mouseover",function(){
//     if (original) paragraph.style.color="red";
//      else paragraph.style.color="black";
//      original = !original;
// });
 paragraph.addEventListener("mouseover",function(){
 paragraph.style.color="red";
 });
  paragraph.addEventListener("mouseleave",function(){
 paragraph.style.color="black";
 });