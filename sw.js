// Version 11.0 - The Restoration Update
const CACHE_NAME = 'oh-za-v11';

const assets = [
  './index.html',
  './manifest.json',
  './logo.png'
];

// 1. Install - Download new files
self.addEventListener('install', (e) => {
  // Forces the new service worker to become active immediately
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('V11 Caching Started');
      return cache.addAll(assets);
    })
  );
});

// 2. Activate - Delete ALL old broken caches (v1 to v10)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Clearing old version:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Takes control of the page immediately
  );
});

// 3. Fetch - Serve files even when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res
