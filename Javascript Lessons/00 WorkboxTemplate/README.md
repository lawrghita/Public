# Workbox TODO Application

In this Application, I use Workbox Command Line Interface - Node Module for [Workbox](https://workboxjs.org/) 
## Workbox Template
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
          "**/*.{html,js,css}",
          "manifest.json",
          "images/icons/*.png"
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
        // check comments on my sw.js for cacheFirst/StaleWhileRevalidate/networkFirst
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
 
 ## Progressive Wep Application Template
1. make a `manifest.json`
     ```
    {
      "name": "PWA Template",
      "short_name": "PWA Template",
      "icons": [
        {
          "src": "/images/icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png"
        },
        {
          "src": "/images/icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "/images/icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png"
        },
        {
          "src": "/images/icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/images/icons/icon-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
        },
        {
          "src": "/images/icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "start_url": "index.html",
      "scope": "/",
      "display": "standalone",
      "background_color": "#3E4EB8",
      "theme_color": "#2F3BA2",
      "prefer_related_applications": true,
      "related_applications": [
        {
          "platform": "play",
          "id": "com.google.samples.apps.iosched"
        }
      ]
    }
    ```    
2. In `index.html` `<head>`
    ```
        <meta name="Description" content="Put your description here.">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta content="A PWA Template" name="description">
        <meta content="yes" name="apple-mobile-web-app-capable">
        <meta content="black" name="apple-mobile-web-app-status-bar-style">
        <meta content="PWA Template" name="apple-mobile-web-app-title">
        <meta content="#2F3BA2" name="theme-color"/>
        <link href="manifest.json" rel="manifest">
        <link href="images/icons/icon-152x152.png" rel="apple-touch-icon">
    ```
 3.  In `index.html` `<body>` define a personalized install button for PWA:
     ```
     <button aria-hidden="true" hidden id="butInstall">Install</button>
     ```
 4. Create `install.js` with function code for PWA install button:
    ```
    'use strict';
    let deferredPrompt;
    // CODELAB: Add event listener for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', function saveBeforeInstallPromptEvent(evt) {
        evt.preventDefault();
        deferredPrompt = evt;
        console.log("beforeinstallprompt", deferredPrompt);
        // CODELAB: Add code to save event & show the install button.
        installButton.removeAttribute('hidden');
    });
    
    let installButton = document.getElementById('butInstall');
    installButton.addEventListener('click', function installPWA() {
    // CODELAB: Add code show install prompt & hide the install button.
        console.log("Prompt", deferredPrompt);
        deferredPrompt.prompt();
    // Hide the install button, it can't be called twice.
        this.setAttribute('hidden', true);
        // CODELAB: Log user response to prompt.
        deferredPrompt.userChoice
            .then((choice) => {
                if (choice.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt', choice);
                } else {
                    console.log('User dismissed the A2HS prompt', choice);
                }
                deferredPrompt = null;
            });
    });
    // CODELAB: Add event listener for appinstalled event
    window.addEventListener('appinstalled', function logAppInstalled(evt) {
    // CODELAB: Add code to log the event
            console.log('Workbox PWA Template was installed.', evt);
            alert('Workbox PWA Template was installed. ' + evt);
        }
    );
     ```
 5. In `index.html` `<body>` before service worker script insert the call for point 4.:
     ```
     <script src="install.js"></script>
     ```
## Note
- Very important, all the paths must point correctly on production deployment: *for example my icons from manifest point to the root/images... for the site production deployment*
- All images are CCO
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