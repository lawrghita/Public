const version="2.1"
document.getElementById("ver").textContent = version;
var link = document.querySelector('a');
var img = document.querySelector('img');
console.log(link);
console.log('getAttribute\(\"href\"\) is',link.getAttribute('href'));


setTimeout(() => {

newLink="http://www.laurghita.eu";
link.setAttribute('href',newLink);
link.text=newLink;

newImg="/img/ochii.jpg";
img.setAttribute('src',newImg);
img.setAttribute('alt','Eyes');


}, 2000);
