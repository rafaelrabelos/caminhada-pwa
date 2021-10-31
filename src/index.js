import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import { App } from "./views";
import * as serviceWorkerRegistration from "./config/pwa/serviceWorkerRegistration";
import reportWebVitals from "./config/testing/reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

reportWebVitals((r) => console.log);
