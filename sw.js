// Change the version to v10 to force the update
const CACHE_NAME = 'oh-za-v10'; 

// List of files to keep for offline use
const assets = [
  './index.html',
  './manifest.json',
  './logo.png'
];

// 1. Install Event - Downloads the new V10 files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('V10 Caching files');
      return cache.addAll(assets);
    })
  );
});

// 2. Activate Event - Deletes the old V9 (or older) cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
