self.addEventListener('install', event => {
  console.log('[Caminhada App] SW install done!');
});

self.addEventListener('activate', event => {
  console.log('[Caminhada App] SW activating done!');
});

self.addEventListener('fetch', event => {
  console.log('[Caminhada App] SW fetching ', event.request.url);
});
