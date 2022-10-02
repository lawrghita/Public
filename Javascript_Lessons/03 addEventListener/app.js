(function (window, document, undefined) {  /*setting a local scope*/
    "use strict";                         /*no console debug*/

    let button = document.querySelector("button");
    let paragraph = document.querySelector("p");
    let li = document.querySelectorAll("li");
    let h5 = document.querySelector("h5");

    console.log(button, paragraph, li, h5);


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
    // let color1 = "green";
    // let color2 = "red";
    li.forEach(function (item) {
        item.addEventListener("click", function () {
            mySwitch(item, "green", "blue");
        });
    });

    h5.addEventListener("mouseover", function () {
        h5.classList.toggle("blue");
    });

    function mySwitch(item, color1, color2) {
        if (item.style.color == color1)
            item.style.color = color2;
        else item.style.color = color1;
    }

})(window, document);