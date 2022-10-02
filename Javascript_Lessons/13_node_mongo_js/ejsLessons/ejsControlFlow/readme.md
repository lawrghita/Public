

```javascript
npm install express --save
npm install ejs
```

quickly create an application skeleton in this folder:
```
express --view=ejs 
npm install
$ DEBUG=myapp:* npm start
$ DEBUG=myapp:* nodemon start   //for restarting due to changes
```

```javascript
<%=  // equal sign mean ADD to the html   %>
<%   // if = missing meaning this code will not render enything to html  %>
```

https://expressjs.com/en/starter/generator.html