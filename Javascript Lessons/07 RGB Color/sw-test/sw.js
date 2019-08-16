self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          './doWork.js',
          './index.html',
          './manifest.json',
          './rgb.css',
          './rgb.js',
          './sw-test/',
          './sw-test/index.html',
          './sw-test/style.css',
          './sw-test/app.js',
          './sw-test/image-list.js',
          './sw-test/star-wars-logo.jpg',
          './sw-test/gallery/',
          './sw-test/gallery/bountyHunters.jpg',
          './sw-test/gallery/myLittleVader.jpg',
          './sw-test/gallery/snowTroopers.jpg'
        ]);
      })
    );
  });