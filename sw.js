const CACHE_NAME = 'oh-za-v22';

const assets = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Allow external libraries to load
  if (e.request.url.includes('cdnjs.cloudflare.com')) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
