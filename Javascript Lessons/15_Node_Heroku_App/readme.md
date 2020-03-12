```javascript
npm init 
npm install express ejs express-generator --save
express --view=ejs
npm install
npm i -g nodemon
```

run the server on loop waiting for edits:
```
> SET DEBUG=15-node-heroku-app:*   //on windows
> nodemon start                 //on windows

$DEBUG=15-node-heroku-app:*  & nodemon start       //on bash
```
go to http://127.0.0.1:3000/

# Deploy this one to Heroku:
https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

```
start cmd
```
