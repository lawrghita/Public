Request from terminal
```bash
curl http://www.google.com
```
from:
```
https://www.npmjs.com/package/request
```


works once:
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

