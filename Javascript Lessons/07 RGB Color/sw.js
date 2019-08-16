'use strict';
var cacheName = 'law-cache-v2.3.3';
self.addEventListener('install', (event) => {
   console.log('Install check',event)
    event.waitUntil(
      caches.open(cacheName).then((cache) => {
        return cache.addAll([
          '/',
          'images/192.png',
          'images/512.png',
          'rgb.js',
          'index.html',
          'doWork.js',
          'manifest.json',
          'rgb.css'
         ]);
      })
      .then(function(){
        console.log('Worker: install Completed');
      })
    );
  });

  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
  });

  // self.addEventListener('push', event => {
  //   console.log(event.target);
  //   event.waitUntil((event) => {
  //     console.log(event.request);
  //   });
  // });
 
  self.addEventListener('fetch', function(event) {
    console.log('WORKER: fetch event in progress.3', self.registration.scope);
    if (event.request.method !== 'GET') {
      /* If we don't block the event as shown below, then the request will go to
         the network as usual.
      */
      console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
      return;
    }
    /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
       Fulfillment result will be used as the response, and rejection will end in a
       HTTP response indicating failure.
    */
    event.respondWith(
      caches.open(cacheName)
        .then(cache => cache.match(event.request, {ignoreSearch: true}))
        .then(response => {
        return response || fetch(event.request);
      })
    );
  });