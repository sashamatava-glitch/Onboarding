// Version 16.1 - Manual Sync & Fix Update
const CACHE_NAME = 'oh-za-v16-1';

const assets = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// 1. INSTALL: Force the new version to replace the old one immediately
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('V16.1 Sync Update: Files Cached');
      return cache.addAll(assets);
    })
  );
});

// 2. ACTIVATE: Wipe out the old "Google Error" version (v16.0) and all previous ones
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Clearing old system memory:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH: Smart Loading (Work offline, but fetch new updates when online)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
