To run a function init(params) from inside a javascript file echo.js
 <script>
node -e 'require("./echo").init("test",4)'
 </script>
that function must be exported as module from inside the echo.js
 <script>
...
module.exports.init = function(text,count) {... ...}
...
 </script>
