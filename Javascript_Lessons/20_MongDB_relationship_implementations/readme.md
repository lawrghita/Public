#heroku login
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
