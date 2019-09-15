const version = document.querySelector("#version");
const time = document.lastModified;
version.textContent = "v.0.3";
// var canvas=document.getElementById("myCanvas");
// console.log(canvas);
//
// var path = new Path();
// path.strokeColor = 'black';
// var start = new Point(100,100);
// path.moveTo(start);
// path.lineTo(start + [100, -50]);

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.moveTo(0, 0);
context.lineTo(400, 400);
context.strokeStyle = "#ff0000";
context.stroke();

