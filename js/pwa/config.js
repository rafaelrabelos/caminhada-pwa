try {
  navigator.serviceWorker.register("./js/pwa/serviceWorker.js").then((reg) => {
    console.log("Caminhada ServiceWorker registered");
  });
} catch (error) {
  console.log(error);
}
