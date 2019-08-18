"use strict";
var cacheName = "law-cache-v3.0.1";
self.addEventListener("install", event => {
  console.log(" SW Install check", event);
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        return cache.addAll([
          "/",
          "./",
          "images/192.png",
          "images/512.png",
          "favicon.ico",
          "fonts/open-sans-v17-latin-regular.ttf",
          "fonts/open-sans-v17-latin-regular.woff",
          "fonts/open-sans-v17-latin-regular.woff2",
          "rgb.js",
          "index.html",
          "doWork.js",
          "manifest.json",
          "sw.js",
          "rgb.css"
        ]);
      })
      // .then(function() {
      //   self.skipWaiting();
      //   console.log(" SW: install Completed");
      // })
  );
});

// self.addEventListener("activate", event => {
//   event.waitUntil(self.clients.claim());
// });

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME !== cacheName &&  cacheName.startsWith("law-cache-v")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



self.addEventListener("push", function() {
  fetch("/Javascript Lessons/07 RGB Color/manifest.json")
  .then(function(response) {
    return self.registration.showNotification(response.text());
  });
});

self.addEventListener("fetch", function(event) {
  console.log("SW: fetch event in progress.4", event.request.url);
  if ( event.request.method === "GET" ) {    
    // &&    event.request.headers.get('accept').indexOf('text/html') !== -1)
    console.log("Handling fetch event for", event.request.url);
     /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
       Fulfillment result will be used as the response, and rejection will end in a
       HTTP response indicating failure.
    */
    event.respondWith(
      caches
        .open(cacheName)
        .then(cache => cache.match(event.request, { ignoreSearch: true }))
        .then(response => {
          console.log("Return:", response, event.request);
          return response || fetch(event.request);
        })
        .catch(function(error) {
          console.log("Error:", error);
          return caches.match("index.html");
        })
    );
  } else {
    console.log(
      "WORKER: fetch event ignored.",
      event.request.method,
      event.request.url
    );
  }
 
});
