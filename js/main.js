try {
  navigator.serviceWorker.register("./sw.js").then((reg) => {
    console.log("SW registered");
  });  
} catch (error) {
  console.log(error);
}

