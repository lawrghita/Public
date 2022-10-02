# Setting Up the app skeleton
```
npm init 
npm install express ejs morgan body-parser --save
npm install express-generator  --global                 //no need to be in production
express --view=ejs                                      // generate the express skeleton app
```
If package.json have dependencies
```
npm install  // for updates
DEBUG=17-heroku-mongo-gallery:* npm start
npm start                                               //etc.  IF RETURNING THIS WILL START in this directory

npm i -g nodemon                                        // or install demon for auto start
nodemon start
```
127.0.0.1/3000

# Connecting the mongo database
```
npm install mongodb --save
npm install mongoose --save                         //package to easy the mongo acces
```
There must be 2 servers active, one is node and another is mongodb
for the node we use the app.js
for the mongo we use the server.js

I server.js the uri request an utilizator and a parola set up as an environment variable ignored for git
Make a file .env on root with this content (keep it secret):
and check server.js for new dependencies and install them
```
npm install dotenv --save
npm install nconf --save
node server.js                      // to access the mongo server who is running in another separate instance with a test 
```
http://127.0.0.1:8080/ entry poigitnt for mongodb server

shell to my remote database from https://www.mongodb.com/
```
mongo "mongodb+srv://cluster0-8s7vx.gcp.mongodb.net/gallery" --username mylawrusername
```

the server.js test app can be deleted after we set a personalized javascript connection for this app to mongo cluster

to run the main application 
```
"start": "node ./bin/www"
```

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
heroku login
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
7. If errors
```
heroku logs --tail
```








Also
for making bootstrap, jquery accesible include in
header:
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
```
& in footer:
```
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
```

To test POST on google cloud I use PostmanChromeExtension (NOT POSTMAN APPLICATION who cant intercep cookies) 

 & Postman cookies interceptor chrome extensions because we cant send POSTs to google cloud unsigned/nocookies

 so I put the cookies intercepted from browser on POSTMAN


Hack ?:
```
$ cd `mktemp -d`
$ cd ..   && ls   // till on root
$ python -m SimpleHTTPServer 3000 // to start a local server and see the virtual machine content
$ python3 -m http.server 9000     // or this one for python3 install
```

For my app web dev link page https://3000-dot-10554228-dot-devshell.appspot.com/:
```
npm start    // for running on development environment and check with Web preview from CloudShell
DEBUG=yelp:* nodemon start  //various settings in nodemon.json
```
If the preview is allright create an app.yaml with ```runtime: nodejs10``` inside 
then to publish app go Yelp directory
```
gcloud config set project lawnodejs
gcloud app deploy
```
FINALLY check https://lawnodejs.appspot.com/






Oh local hardisk:
```javascript
npm init 
npm install express ejs express-generator --save
express --view=ejs
npm install
npm i -g nodemon
```

run the server on loop waiting for edits:
```
> SET DEBUG=14-yelp-like-app:* & nodemon --delay 5 start  //on windows
$DEBUG=Yelp:* & nodemon --delay 5 start       //on bash
```

I use Modal to display the full image by 
making every image a button who activate a modal using a unique ID 
created from the mongo id

First Test & make  it run LawMongo app 
```
npm install mongoose --save
```

RUNNING VSCODE ON A VM GOOGLE CLOUD INSTANCE

Create a GOOGLE Compute Engine VM INSTANCE
SSH on that and write down ExternalIP from this commands you need that later
```
$dig TXT +short o-o.myaddr.l.google.com @ns1.google.com | awk -F'"' '{ print $2}'
$host myip.opendns.com resolver1.opendns.com | grep "myip.opendns.com has" | awk '{print $4}'
$wget -qO - icanhazip.com
```
will use that later on a browser

from https://github.com/cdr/code-server/releases download the arhive for your type of linux arm/86_64 (for me is what I use next)
```
$ wget https://github.com/cdr/code-server/releases/download/2.1698/code-server2.1698-vsc1.41.1-linux-x86_64.tar.gz
$ ls
```
dezarchived the downloaded archive enter in the directory and launch the executable
```
$ tar -xvzf code-server2.1698-vsc1.41.1-linux-x86_64.tar.gz
$ ls
$ cd code-server2.1698-vsc1.41.1-linux-x86_64
$ sudo ./code-server --help
$ sudo ./code-server --port 80                
```
Ctrl+ C will stop the server so do not stop if you want next to work

Then on browser http://ExternalIP:80 after you get the external IP of the instance from ComputeEngine or use what you get on the command 
```
dig TXT +short o-o.myaddr.l.google.com @ns1.google.com | awk -F'"' '{ print $2}'
```
And open a terminal in vscode to keep connection stable (instable because low memory on host)

 For direct connection and bypass memory low problem
 https://towardsdatascience.com/unleash-the-power-of-visual-studio-code-vscode-on-google-cloud-platform-virtual-machine-f75f78f49aee

putty si puttygen create pair of keys 
public uploaded on ssh keys of VM private 
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
remove this err by exporting the private key as openssh from putty/generator
and on that file on windows Right click and chose "Give acces to" Remove acces

to elimnate error warning: agent returned different signature type ssh-rsa (expected rsa-sha2-512)
you must generate the key with
```
ssh-keygen -t rsa -b 2048 -E sha512
```
and use the sha512 file wich is the private key and user@serverIP

 Make sure you're running as an Administrator on windows:
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent




#  Anothe try:
https://cloud.google.com/community/tutorials/mongodb-atlas-appengineflex-nodejs-app

Connection string:
```
mongodb+srv://user:password@cluster0-8s7vx.gcp.mongodb.net/test?retryWrites=true&w=majority
```
with folowing modification on example server.js code
```
    ..
    mongodb.MongoClient.connect(uri, (err, client) => {
    ..
    let db = client.db('test');                         
    const collection = db.collection('Messages');
    ..

```

And its working, I acces the mongodb external cluster from a backend serverinstance
one terminal 
```
npm start
```
and the second terminal curl localhost:8080
    
to run both servers, mongo and http in package.json

```
"start": "node ./bin/www & node server.js"
```
to run mongo shell from here on mongo cluster first download teh linux mongo binary
```
wget https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-debian92-4.2.3.tgz
tar -xvzf mongodb-shell-linux-x86_64-debian92-4.2.3.tgz
```
then from any location you can call the mongo shell with
```
../mongodb-linux-x86_64-debian92-4.2.3/bin/mongo "mongodb+srv://cluster0-8s7vx.gcp.mongodb.net/test"  --username lawrghita
    >show dbs
    >
    >show collections
    >db.nameofcollection.find().pretty()
    >quit
```

# Memory content on linux
```
htop
```
if error Error: listen EADDRINUSE: address already in use :::8080  or both servers at production stage use the same port
on deploy check if cluster have beside the all IP acces also current IP acces on network Acces 0.0.0.0/0
```
lsof -ti:8080 | xargs kill     /this command kill any process blocking 8080
``` 

bootstrap 4 images responsive - dimension flexible etc:
```
<img src="images/food1.jpg" class="img-fluid">
```
