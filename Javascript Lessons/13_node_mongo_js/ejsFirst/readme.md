```javascript
npm install express --save
npm install ejs
```
```javascript
 res.render("index.ejs",{variable})
```
in index.ejs file use
```html
<%= variable //javascript code in fact %>
``` 




  using template syntax for port variable attention is about \` character not '
  ```
  console.log(`Example app listening on port number ${port}!`);
  ```
  