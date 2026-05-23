// Onboarding Hub ZA - Service Worker V14.0
const CACHE_NAME = 'oh-za-v14';

// Assets to store for offline use
const assets = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// 1. INSTALL: Download the new V14 files
self.addEventListener('install', (e) => {
  // Force the new version to activate immediately
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('V14 Caching: Succ
