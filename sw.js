// Onboarding Hub ZA - Service Worker V25.0
// Forces a clean update to fix driver visibility and enable corporate fonts.
const CACHE_NAME = 'oh-za-v25';

const assets = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// 1. INSTALL: Download new files and force them to replace old versions immediately
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('V25 Corporate Build Caching: Success');
      return cache.addAll(assets);
    })
  );
});

// 2. ACTIVATE: Delete all legacy versions (V1 through V24) to free up memory
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Purging old version:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Takes control of the app instantly
  );
});

// 3. FETCH: Professional caching logic
self.addEventListener('fetch', (e) => {
  // Allow External Corporate Fonts and PDF libraries to load from the web
  if (e.request.url.includes('cloudflare') || e.request.url.includes('gstatic') || e.request.url.includes('googleapis')) {
    return fetch(e.request);
  }

  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
