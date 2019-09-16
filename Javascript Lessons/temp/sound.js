function mySolution() {
    // var canvas = document.querySelector("myCanvas");
    //    console.log(canvas);
    //    paper.setup(canvas);
    //    // paper.install(window);
    var myPath = new paper.Path();
    myPath.strokeColor = "black";
    var start = new paper.Point(100, 100);
    var finish = new paper.Point(100, -50);
    myPath.moveTo(start);
    // myPath.lineTo(start + [100, -50]);
    myPath.lineTo(start.add([100, -50]));
    // myPath.lineTo(finish);
    console.log(myPath, start);


    var myCircle = new paper.Path.Circle(new paper.Point(100, 70), 10);
    myCircle.fillColor = "green";

    //
    // window.onload = function () {
    //     // Get a reference to the canvas object
    //     var canvas = document.querySelector("myCanvas");
    //     // Create an empty project and a view for the canvas:
    //     console.log(canvas);
    //     paper.setup(canvas);
    //     with (paper) {
    //         // Create a Paper.js Path to draw a line into it:
    //         var path = new Path();
    //         // Give the stroke a color
    //         path.strokeColor = 'black';
    //         var start = new Point(100, 100);
    //         // Move to start and draw a line from there
    //         path.moveTo(start);
    //         // Note that the plus operator on Point objects does not work
    //         // in JavaScript. Instead, we need to call the add() function:
    //         path.lineTo(start.add([200, -50]));
    //         // Draw the view now:
    //        view.draw();
    //     }
    // }
    //

}