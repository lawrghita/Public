
# YELP Skeleton  implemented

# A simple node application hosted & deployed to heroku

```
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
You must set first an account at heroku site then follow:
https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
like this:

1. After install https://cli-assets.heroku.com/heroku-x64.exe run:
```
>   c:\"Program Files"\heroku\bin\heroku
>   c:\"Program Files"\heroku\bin\heroku login
```
2. You must make the following commands run clean by installing the associated applications 
```
node --version
npm --version
git --version
```
3. if you have the package.json filled with dependencies: 
```
heroku create
```
4. You will see in the web heroku account a personal name-app-numbers 
for that app you run on his directory:
```
git init
heroku git:remote -a name-app-numbers
```
5. to commit any modifications and deploy
```
git add .
git commit -am "make it better"
git push heroku master
heroku ps:scale web=1
```

6. FINAL go to https://name-app-numbers.herokuapp.com/
or:
```
heroku open
```
