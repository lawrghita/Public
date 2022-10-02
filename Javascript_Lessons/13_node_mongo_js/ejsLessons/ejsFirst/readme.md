```javascript
npm install express --save
npm install ejs
```

  define location for public static files jpg, etc.:
```
app.use(express.static('public'));
```
define view engine for server
```
app.set('view engine', 'ejs');
```

inside app.js::
```javascript
var variableDeclaredOnJS=1 ;
var variable = 12;
res.render("fall.ejs",{usedInEJSfile: variableDeclaredOnJS})
res.render("index.ejs",{variable})
```
inside index.ejs:
```
<%= variable+usedInEJSfile // after = you put javascript code in fact %>
```
this will render the number 13 on screen


