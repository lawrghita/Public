'use strict';
var cacheName = 'law-cache-v2.1';
self.addEventListener('install', (event) => {
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
    );
  });

  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('push', event => {
    console.log(event.target);
    event.waitUntil((event) => {
      console.log(event.request);
    });
  });
 
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.open(cacheName)
        .then(cache => cache.match(event.request, {ignoreSearch: true}))
        .then(response => {
        return response || fetch(event.request);
      })
    );
  });