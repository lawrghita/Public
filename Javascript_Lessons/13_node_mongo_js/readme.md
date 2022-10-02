 to run node from any terminal in separate windows
 ```
start node
 ```

To run a function init(params) from inside a javascript file echo.js
```
node -e 'require("./echo").init("test",4)'
 ```
that function must be exported as module from inside the echo.js
 ```
...
module.exports.init = function(text,count) {... ...}
...
 
 to refres server under node on any change of server application
 https://www.youtube.com/watch?v=GvLvrlOqq9g&feature=youtu.be
 ```
npm i -g nodemon
 ```
