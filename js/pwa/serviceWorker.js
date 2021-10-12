let cache_name = 'caminhada-v0.15';
let urls_to_cache = [
  '/',
  '/index.html',
  '/walking.html',
  '/js/pages/loginScreen.js',
  '/js/pages/walking.js',
  '/js/pwa/config.js',
  '/js/services/walkingService.js',
  '/js/utils/gLoginOauth2.js',
  '/js/utils/session.js',
  '/styles/main.css'
 ]

self.addEventListener("install", (event) => {
  console.log("Caminhada ServiceWorker install done!");

  event.waitUntil(caches.open(cache_name).then((cache) => {
    return cache.addAll(urls_to_cache)
   }) )

});

self.addEventListener("activate", (event) => {
  console.log("Caminhada ServiceWorker activating done!");
});

self.addEventListener("fetch", (event) => {
  console.log("Caminhada ServiceWorker fetching ", event.request.url);
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      else return fetch(event.request);
    })
  );
});
