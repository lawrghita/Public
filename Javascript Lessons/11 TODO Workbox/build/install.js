/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
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
