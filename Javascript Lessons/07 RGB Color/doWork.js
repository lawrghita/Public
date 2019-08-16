
console.log("Inside: Something internal first");
postMessage("By First postMessage: Worker doing something independent in this area");
console.log("Inside: Something internal second");

onmessage = function(e) {
    console.log('Inside: Message received from main script =', e);
    var workerResult = 'Inside Result: ' + e.data;
    console.log('Inside: Posting message back to main script', workerResult);
    // postMessage( "By Second postMessage: "+ e.data+" "+e.target.origin);
    postMessage( "By Second postMessage: "+ workerResult);
  }