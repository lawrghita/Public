var request = require('request');
require('locus');
request('https://jsonplaceholder.typicode.com/users/1', function (error, response, body) {   //callback function.... asyncron
    if (error) {
        console.log('Something is Wrong error: ', error); // Print the error if one occurred
    }
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (!error && response.statusCode == 200) {
        var parsedBody=JSON.parse(body);  //because body is returned as a string
        console.log(parsedBody);
      //  eval(locus);
        console.log(parsedBody["address"]["geo"]["lat"]);
        console.log(parsedBody.address.geo.lat);
        console.log(`Latitude ${parsedBody.address["geo"].lat} for the ${parsedBody.name}`);
    }
});