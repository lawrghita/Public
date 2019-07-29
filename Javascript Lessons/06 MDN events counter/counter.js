"use strict";
let url="https://developer.mozilla.org/en-US/docs/Web/Events";

var xhr = new XMLHttpRequest();
xhr.onload = function() {
  console.log(this.responseXML.title);
  console.log('this',this);
  console.log("XML",this.responseXML);
  let x = this.responseXML;
  console.log("X",x.querySelectorAll('a'));
  
  
  
//   console.log("ALL",this.responseXML.all);
//   let a = this.responseXML.all;
//   console.log('a', a[1,2]);
  
}
xhr.open("GET", url);
xhr.responseType = "document";
xhr.send();

