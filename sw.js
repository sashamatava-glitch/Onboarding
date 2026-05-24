// Version 16.0 - Financial & Cloud Sync Update
const CACHE_NAME = 'oh-za-v16';

const assets = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// 1. INSTALL: Download files for offline use
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Forces the new version to take over immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('V16 Caching Success');
      return cache.addAll(assets);
    })
  );
});

// 2. ACTIVATE: Purge old broken caches (V1 through V15)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Purging old cache version:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH: Safe Mode - Try network first, fall back to cache
// This prevents the "blank screen" if the phone has a bad internet connection
self.addEventListener('fetch', (e) => {
  // Ignore Google Auth requests so the login works properly
  if (e.request.url.includes('google')) return;

  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
