// Service worker ученика: всё приложение кешируется при первом открытии и дальше работает без интернета.
const CACHE = 'sauat-app-v2';
const QR = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js';
const ASSETS = ['/app/', '/app/index.html', '/css/app.css', '/js/app.js', '/js/content.js', '/app/manifest.webmanifest', '/icon.svg', QR];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.pathname.startsWith('/api/')) return; // ИИ и синхронизация — только онлайн
  if (url.origin !== location.origin && e.request.url !== QR) return;
  e.respondWith(caches.open(CACHE).then(async (c) => {
    const cached = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then((r) => { if (r && r.ok) c.put(e.request, r.clone()); return r; }).catch(() => null);
    return cached || (await net) || c.match('/app/index.html');
  }));
});
