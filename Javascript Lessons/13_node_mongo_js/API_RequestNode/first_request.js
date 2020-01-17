var request = require('request');
request('http://www.laurghita.eu', function (error, response, body) {   //callback function.... asyncron
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if(!error && response.statusCode == 200){
    console.log('body:', body); // Print the HTML for the Google homepage.
    }
});