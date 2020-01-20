Request from terminal
```bash
curl http://www.google.com
```
from:
```
https://www.npmjs.com/package/request
```


works in command line like a REPL breakpointer, but once once (error somewhere):
```javascript
npm install locus --save-dev
require('locus');
...
eval(locus);
...
```

put this in package.json
```
  "scripts": {
    "start": "nodemon first_request.js"
  },
```
and then you can run with ```npm start```

This modules is installed via npm, --save for info in package-lock.json:
```
npm install --save request
npm install --save request-promise
```