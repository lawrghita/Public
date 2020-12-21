"use strict";
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var xhr = new XMLHttpRequest();
//global.XMLHttpRequest = require('xhr2');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let url = "https://developer.mozilla.org/en-US/docs/Web/Events";
var xhr = new XMLHttpRequest();
console.log(xhr);
let myDiv = document.getElementById('id');

xhr.onload = function () {
  let xml = this.responseXML;
    let eventAnchors = xml.querySelectorAll('tr td a');
  let index = 0;
  while (index < eventAnchors.length) {
    let element = eventAnchors[index];
   
    if (element.href.includes("/en-US/docs/Web")
      && !element.href.includes("API/")
      && !element.href.includes("HTML/")
      && !element.href.includes("Manifest")
      && !element.href.includes("CSS/")
      && !element.href.includes("DOM/")
      && !element.href.includes("XUL")) {
      const nameEvent = element.href.slice(element.href.lastIndexOf('/') + 1);
      noEvent++;
      console.log(element.href, nameEvent, noEvent);
      text += "<p>"+noEvent+" <a href='" + element.href + "'>" + nameEvent + "</a>";
    }
    index++;
  }
};
xhr.open("GET", url);
xhr.responseType = "document";
let noEvent = 0;
let text = "";
xhr.send();
setTimeout(function () {
  console.log("Numbers of events ", noEvent);
  myDiv.innerHTML = text;
}, 2000);
