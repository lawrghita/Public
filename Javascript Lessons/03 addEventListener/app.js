button = document.querySelector("button");
paragraph = document.querySelector("p");
li = document.querySelectorAll("li");
console.log(button, paragraph, li);

var nbClicked = 1;
button.addEventListener("click", function() {

    paragraph.textContent = button.textContent + " clicked " + nbClicked + " times";
    nbClicked++;
});
// var original = true
// paragraph.addEventListener("mouseover",function(){
//     if (original) paragraph.style.color="red";
//      else paragraph.style.color="black";
//      original = !original;
// });
paragraph.addEventListener("mouseover", function() {
    paragraph.style.color = "red";
});
paragraph.addEventListener("mouseleave", function() {
    paragraph.style.color = "black";
});


li.forEach(function(item) {
    item.addEventListener("click", function() {
        if (this.style.color == "blue")
            this.style.color = "black";
        else this.style.color = "blue";
    });
});



// addEventListener("click", function() {
//     this.style.color = "blue";
// });