# ExpressNodeYelp

You will see in the web heroku account a personal name-app-numbers 
for that app you run:
```
heroku login
heroku create
```

```
git init
heroku git:remote -a aqueous-eyrie-81055
```
 to commit any modifications and deploy
```
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

# must put .env at least once git push heroku master for production 