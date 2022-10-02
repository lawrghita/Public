const version = "2.1";
document.getElementById("ver").textContent = version;
var link = document.querySelector('a');
var img = document.querySelector('img');
console.log(link);
console.log('getAttribute\(\"href\"\) is',link.getAttribute('href'));


setTimeout(() => {

newLink="http://www.laurghita.eu";
link.setAttribute('href',newLink);
link.text=newLink;

newImg="https://raw.githubusercontent.com/lawrghita/Public/21ecac1d3dfd5e48323790374f0d824c5eb4f032/Javascript_Lessons/02%20set_getAttribute/img/ochii.jpg";
img.setAttribute('src',newImg);
img.setAttribute('alt','Eyes');


}, 2000);
let thisLocation = window.location.href;
console.log(thisLocation);
