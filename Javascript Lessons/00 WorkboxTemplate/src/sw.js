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

    workbox.precaching.precacheAndRoute([]);

//
// // cache first
//     workbox.routing.registerRoute(
//         new RegExp('/images/articles/'),
//         workbox.strategies.cacheFirst({
//             cacheName: 'images-cache',
//             plugins: [
//                 new workbox.expiration.Plugin({
//                     maxEntries: 50,
//                     maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//                 })
//             ]
//         })
//     );
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
