self.addEventListener("install", (event) => {
  console.log("Caminhada ServiceWorker install done!");
});

self.addEventListener("activate", (event) => {
  console.log("Caminhada ServiceWorker activating done!");
});

self.addEventListener("fetch", (event) => {
  console.log("Caminhada ServiceWorker fetching ", event.request.url);
});
