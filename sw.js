self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v8').then((cache) => cache.addAll(['./index.html', './manifest.json', './logo.png']))
  );
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
