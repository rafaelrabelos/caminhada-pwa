import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DefaulLayout from "./layouts/default";
import * as serviceWorkerRegistration from "./config/pwa/serviceWorkerRegistration";
import reportWebVitals from "./config/testing/reportWebVitals";
import "./assets/styles/main.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/app" render={(props) => <DefaulLayout {...props} />} />
        <Redirect from="/" to="/app/login" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

reportWebVitals((r) => console.log);
