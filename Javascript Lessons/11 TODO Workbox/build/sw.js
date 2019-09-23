/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loadeed 🎉`);

    workbox.precaching.precacheAndRoute([
  {
    "url": "install.js",
    "revision": "07f0f114f6dcfe9d08455f53ea8cae1e"
  },
  {
      "url": "js/lib/jquery-3.4.1.js",
      "revision": "9ba9f67d0ec44b20a0bce539b608b979"
  },
        {
            "url": "todo.css",
            "revision": "0c05fb7e0c8d17fe7bb350140633b16f"
        },
  {
      "url": "todo.js",
      "revision": "964cdd33cf4861814c5b6c9a1b177abf"
  },
        {
            "url": "404.html",
            "revision": "aaad9f7c87f3d7512d8a7579dcc8a931"
        },
  {
    "url": "offline.html",
    "revision": "0d8c51a202eb49c95e0f09dfa4472a83"
  },
  {
    "url": "manifest.json",
    "revision": "e5bf36cbf13d9f99668c1ef8b57bdcd8"
  },
  {
      "url": "fonts/open-sans-v17-latin-regular.ttf",
      "revision": "049a929c5d81988b3ae6d2f985ca7aa5"
  },
        {
            "url": "icons/add.svg",
            "revision": "f0710c7f51dcef757d0138e1945dc8e8"
        },
        {
            "url": "icons/calendar-check-regular.svg",
            "revision": "0c8bf58af546808e571d9ac3958dfdb7"
        },
        {
            "url": "icons/calendar-times-regular.svg",
            "revision": "a1b72818af666d1ed3bfb455aa9941c5"
        },
        {
            "url": "icons/delete.svg",
            "revision": "270d72e93d421c23d4c519692a187af4"
        },
        {
            "url": "icons/plus-solid.svg",
            "revision": "238b124d585b60e25882c760d26ff252"
        },
        {
            "url": "images/192.png",
            "revision": "8d61b836daff8134ec4f4b12743de4bc"
        },
        {
            "url": "images/512.png",
            "revision": "0f58cf2cd73f18eb0823fdc2b90fb0d2"
        },
        {
            "url": "images/icon-128x128.png",
            "revision": "007dff90d9d50ed8b7c515c21a150f3e"
        },
        {
            "url": "images/icon-144x144.png",
            "revision": "92871c72b5ae91f05e62db1792e028b7"
        },
        {
            "url": "images/icon-152x152.png",
            "revision": "2a65930e10acb628ee982835936d0cf4"
        },
        {
            "url": "images/icon-192x192.png",
            "revision": "8d61b836daff8134ec4f4b12743de4bc"
        },
        {
            "url": "images/icon-256x256.png",
            "revision": "4acbfb4b5dc6fedb457376ba5371b9ae"
        },
        {
            "url": "images/icon-512x512.png",
            "revision": "0f58cf2cd73f18eb0823fdc2b90fb0d2"
        },
        {
            "url": "images/icons/icon-128x128.png",
            "revision": "007dff90d9d50ed8b7c515c21a150f3e"
        },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "92871c72b5ae91f05e62db1792e028b7"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "2a65930e10acb628ee982835936d0cf4"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "8d61b836daff8134ec4f4b12743de4bc"
  },
  {
    "url": "images/icons/icon-256x256.png",
    "revision": "4acbfb4b5dc6fedb457376ba5371b9ae"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "0f58cf2cd73f18eb0823fdc2b90fb0d2"
  }
]);


// cache first
    workbox.routing.registerRoute(
        new RegExp('index.html'),
        workbox.strategies.cacheFirst({
            cacheName: 'index-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );
//
//
//     //cache first for old html`s rare update
//     const postHandler = workbox.strategies.cacheFirst({
//         cacheName: 'post-cache',
//         plugins: [
//             new workbox.expiration.Plugin({
//                 maxAgeSeconds: 365 * 24 * 60 * 60, //  1 year
//                 maxEntries: 50,                    // just 50 old archived posts
//             })
//         ]
//     });
//     workbox.routing.registerRoute(
//         new RegExp('/pages/(.*)post(.*).html'), args => {
//             return postHandler.handle(args)
//                 .then(response => {
//                     if (response.status === 404) {
//                         return caches.match('pages/404.html');
//                     }
//                     return response;
//                 })
//                 .catch(function () {
//                     return caches.match('pages/offline.html')
//                 });
//         });
//
//     // first show quick the cache then try to update the cache from network
//     //  The stale-while-revalidate strategy is ideal for certain types of data.
//     //  It gets data on screen as quickly as possible, then updates that once the network has returned the latest data
//     workbox.routing.registerRoute(
//         new RegExp('/images/icon/(.*)icon(.*).(.*)'),
//         new workbox.strategies.StaleWhileRevalidate({
//             cacheName: 'icon-cache',
//             plugins: [
//                 new workbox.expiration.Plugin({
//                     maxAgeSeconds: 365 * 24 * 60 * 60, //  1 year
//                 })
//             ]
//         })
//     );
//
// // must be first from network
//     const articleHandler = workbox.strategies.networkFirst({
//         cacheName: 'articles-cache',
//         plugins: [
//             new workbox.expiration.Plugin({
//                 maxEntries: 5,
//             })
//         ]
//     });
//     workbox.routing.registerRoute(
//         new RegExp('/pages/(.*)article(.*).html'), args => {
//             return articleHandler.handle(args)
//                 .then(response => {
//                     if (!response) {
//                         return caches.match('pages/offline.html');
//                     } else if (response.status === 404) {
//                         return caches.match('pages/404.html');
//                     }
//                     return response;
//                 });
//         });


} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
