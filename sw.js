// Version 12.0 - Platinum Force Update
const CACHE_NAME = 'oh-za-v12';

const assets = [
  './index.html',
  './manifest.json',
  './logo.png'
];

// 1. INSTALL: Download new files and force them to activate
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Critical: Tells the phone to switch to V12 immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('V12 Platinum Caching Initialized');
      return cache.addAll(assets);
    })
  );
});

// 2. ACTIVATE: Delete every single old version (V1 through V11)
self.addEventListener('activate', (e) => {
  e.waitUnt
