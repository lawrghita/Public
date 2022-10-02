"use strict";
let list = document.querySelectorAll('li');
for (let index = 0; index < list.length; index++){
 list[index].addEventListener('mouseover',function(){
   this.classList.toggle('green');
 });   
 list[index].addEventListener('mouseout',function(){
    this.classList.toggle('green');
  });   
  list[index].addEventListener('click',function(){
    this.classList.toggle('clicked');
  });   
  
  
console.log(list[index].textContent);
}

