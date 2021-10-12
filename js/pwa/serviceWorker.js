let cache_name = 'caminhada-v0.16';
let urls_to_cache = [
  '/',
  '/index.html',
  '/walking.html',
  '/js/pages/loginScreen.js',
  '/js/pages/walking.js',
  '/js/pwa/config.js',
  '/js/pwa/serviceWorker.js',
  '/js/services/walkingService.js',
  '/js/utils/gLoginOauth2.js',
  '/js/utils/session.js',
  '/styles/main.css',
  'https://apis.google.com/js/platform.js',
  'https://apis.google.com/js/platform.js?onload=attachGoogleLogin',
  '/assets/imagens/icones/android/mipmap-xxxhdpi/ic_launcher.png',
  '/assets/imagens/icones/favicon/favicon.ico',
  '/assets/imagens/icones/IOS/29.png',
  '/assets/imagens/icones/IOS/40.png',
  '/assets/imagens/icones/IOS/57.png',
  '/assets/imagens/icones/IOS/58.png',
  '/assets/imagens/icones/IOS/60.png',
  '/assets/imagens/icones/IOS/80.png',
  '/assets/imagens/icones/IOS/87.png',
  '/assets/imagens/icones/IOS/114.png',
  '/assets/imagens/icones/IOS/120.png',
  '/assets/imagens/icones/IOS/180.png',
  '/assets/imagens/icones/IOS/1024.png',
 ]

self.addEventListener("install", (event) => {
  console.log("Caminhada ServiceWorker install done!");

  event.waitUntil(
    caches
      .open(cache_name)
      .then((cache) => {
        return cache.addAll(urls_to_cache);
      })
      .catch((err) => console.log(err))
  );

});

self.addEventListener("activate", (event) => {
  console.log("Caminhada ServiceWorker activating done!");
});

self.addEventListener("fetch", (event) => {
  console.log("Caminhada ServiceWorker fetching ", event.request.url);
  
  event.respondWith(
    caches.open(cache_name).then((cache) =>{
      fetch(event.request)
        .then((res) => {
          cache.put(event.request, res.clone());
        })
        .catch(() => caches.match(event.request));
    })
    
  );
});
