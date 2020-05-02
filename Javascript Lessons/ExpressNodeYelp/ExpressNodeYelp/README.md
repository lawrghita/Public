# ExpressNodeYelp

# You will see in the web heroku account a personal name-app-numbers 
for that app you run on his directory:
```
heroku create
```

```
git init
heroku git:remote -a name-app-numbers
```
 to commit any modifications and deploy
```
heroku login
git add .                                   
git commit -am "make it better"
git push heroku master
heroku ps:scale web=1
```

 FINAL go to https://name-app-numbers.herokuapp.com/
or:
```
heroku open
```
 If errors
```
heroku logs --tail
```

