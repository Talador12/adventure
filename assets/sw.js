// Adventure Service Worker — offline-first static assets, network-first API calls.
// Cache name includes version for easy invalidation on deploy.
const CACHE_NAME = 'adventure-v1';
const STATIC_ASSETS = ['/', '/index.html', '/favicon.ico', '/adventure.png'];
const CACHEABLE_EXTENSIONS = /\.(js|css|woff2?|ttf|png|jpg|jpeg|webp|svg|ico|json)$/i;

// Install: pre-cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate for static assets, network-first for API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET, WebSocket upgrades, and chrome-extension requests
  if (event.request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;
  if (event.request.headers.get('upgrade') === 'websocket') return;

  // API calls: network-first, no caching
  if (url.pathname.startsWith('/api/')) return;

  // Static assets: stale-while-revalidate
  if (CACHEABLE_EXTENSIONS.test(url.pathname) || url.pathname === '/' || url.pathname === '/index.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          const fetchPromise = fetch(event.request).then((response) => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached); // offline fallback to cache
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // SPA fallback: for navigation requests, serve cached index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
  }
});
