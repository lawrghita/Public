# Workbox TODO Application

In this Application, I use Workbox Command Line Interface - Node Module for [Workbox](https://workboxjs.org/) 
## Getting started
1. Note: You'll need to have [Node installed](https://nodejs.org/en/download/) to use the Workbox CLI.
2. To see if Node is installed, open any terminal type: `node -v`  *check the node version*
3. create a `/src` directory where all source files for the server are edited 
4. create a `/build` directory where just the npm will build the server production
5. copy and modify the `server.js` and `package.json`
6. navigate to project directory and terminal this: 
    * `npm install` 
    * `npm install workbox-cli --global`
    * `workbox --help`
7. in `/src/index.html` put
    ```javascript
            <script>
               if ('serviceWorker' in navigator) {
                 window.addEventListener('load', () => {
                   navigator.serviceWorker.register('sw.js')
                     .then(registration => {
                       console.log(`Service Worker registered! Scope: ${registration.scope}`);
                     })
                     .catch(err => {
                       console.log(`Service Worker registration failed: ${err}`);
                     });
                 });
               }
             </script>
     ```
  8. crate a `workbox-config.js` file with
     ```
     module.exports = {
      "globDirectory": "build/",
      "globPatterns": [
          "index.html",
          "offline.html",
          "404.html"
      ],
      "swSrc": "src/sw.js",
      "swDest": "build\\sw.js",
      "globIgnores":["../workbox-config.js"]
      };
        ```
 9. create a `src/sw.js` for the start with just:
     ``` javascript
     importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
      if (workbox) {
       console.log(`Yay! Workbox is loaded 🎉`);
        workbox.precaching.precacheAndRoute([]);
      } else {
       console.log(`Boo! Workbox didn't load 😬`);
     }
     ```
10. run the in project terminal `npm run build`
11. run `npm run start`
12. check in browser `http://localhost:8081`
13. configure the workbox on project terminal with `workbox wizard --injectManifest`
    * root is `build/`
    * chose the first files to be always cached (mainly those from landing and main page) 
    * at final when ask Where's your existing service worker file? you type `src/sw.js`
    * enter for `build\sw.js`
    * enter for `workbox-config.js`
    

## Note
All images are CCO
## License
Copyright lawrghita

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.