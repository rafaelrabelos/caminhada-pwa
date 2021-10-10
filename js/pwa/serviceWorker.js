let cache_name = 'caminhada-v0.15';
let urls_to_cache = [
  '/',
  '/js/pages',
  '/js/services',
  '/js/utils'
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
