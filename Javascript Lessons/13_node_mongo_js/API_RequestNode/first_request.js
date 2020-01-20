const request = require('request');
const rp = require('request-promise');
const uri='https://jsonplaceholder.typicode.com/users/1';
request(uri, function executeOnConnection(error, response, body) {   //callback function.... asyncron
    if (error) {
        console.log('Something is Wrong error: ', error); // Print the error if one occurred
    }
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (!error && response.statusCode == 200) {
        var parsedBody=JSON.parse(body);  //because body is returned as a string
        console.log(parsedBody);
        console.log(parsedBody["address"]["geo"]["lat"]);
        console.log(parsedBody.address.geo.lat);
        console.log(`Latitude ${parsedBody.address["geo"].lat} for the ${parsedBody.name}`);
    }
});
rp(uri)
.then(function executed(htmlString) {
    console.log(`request-promise sometime executed before the normal request:`);
    console.log(JSON.parse(htmlString));
})
.catch(function errorReturned(error) {
   console.log("request-promise sometime executed before the normal request"+error);
});