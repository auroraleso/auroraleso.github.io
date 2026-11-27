const cacheName = 'filo-mobile-v24';
const files = ['./index.html','./plans.js?v=24','./budget.html','./pac.html','./manifest.webmanifest','./icon-180.png?v=2','./icon-192.png?v=2','./icon-512.png?v=2'];
self.addEventListener('install', event => event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(files))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('filo-mobile-') && key !== cacheName).map(key => caches.delete(key))))));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.open(cacheName).then(cache => cache.match('./index.html','./plans.js?v=24','./budget.html','./pac.html'))));
    return;
  }
  const url = new URL(event.request.url);
  if (files.some(file => new URL(file,self.registration.scope).href === url.href)) {
    event.respondWith(caches.open(cacheName).then(cache => cache.match(event.request)).then(hit => hit || fetch(event.request)));
  }
});
























