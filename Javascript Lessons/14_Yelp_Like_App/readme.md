```javascript
npm init 
npm install express ejs express-generator --save
express --view=ejs
npm install
npm i -g nodemon
```

run the server on loop waiting for edits:
```
> SET DEBUG=14-yelp-like-app:* & nodemon start  //on windows
$DEBUG=14-yelp-like-app:* & nodemon start       //on bash
```