// console.log("Inside Worker: Something internal first");
// console.log("Inside Worker: Something internal second");

onmessage = function(e) {
  // console.log("Inside Worker onmessage(): Something internal to do");
  // console.log('Inside Worker: Message received from main script =', e);
  var workerResult = "Inside Worker: " + e.data;
  // console.log('Inside Worker: Posting message back to main script', workerResult);
  // postMessage( "By Second postMessage: "+ e.data+" "+e.target.origin);
  postMessage(" Inside Worker, By Second postMessage: " + workerResult);
};
