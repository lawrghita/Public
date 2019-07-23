"strict mode";
button = document.querySelector("button");
paragraph = document.querySelector("p");
li = document.querySelectorAll("li");
h5 = document.querySelector("h5");

console.log(button, paragraph, li,h5);


var nbClicked = 1;
button.addEventListener("click", function () {

    paragraph.textContent = button.textContent + " clicked " + nbClicked + " times";
    nbClicked++;
});
// var original = true
// paragraph.addEventListener("mouseover",function(){
//     if (original) paragraph.style.color="red";
//      else paragraph.style.color="black";
//      original = !original;
// });

// or this doing the same but more readable code:

paragraph.addEventListener("mouseover", function () {
    paragraph.style.color = "red";
});
paragraph.addEventListener("mouseleave", function () {
    paragraph.style.color = "black";
});

// callback with parameters :
li.forEach(function (item) {
    item.addEventListener("click", function () {
        if (this.style.color == color1)
            this.style.color = color2;
        else this.style.color = color1;
    });
}, color1 = "green", color2 = "red");

h5.addEventListener("mouseover", function() {
    h5.classList.toggle("blue");    
});

