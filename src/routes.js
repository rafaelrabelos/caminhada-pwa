import { Route } from "react-router-dom";
import React from "react";

// Pages
import { App } from "./views";

const authRoutes = [
  {
    layout: "/app",
    page: "/login",
    nome: "Login",
    component: App,
  },
];

const walkingRoutes = [
  {
    layout: "/app",
    page: "/walking",
    nome: "walking",
    component: App,
  },
];

const routes = [].concat(...[walkingRoutes, authRoutes]);

function getRoutes(routesArray, layout) {
  return routesArray.map((prop, key) => {
    if (prop.layout === layout) {
      return (
        <Route
          path={prop.layout + prop.page}
          component={prop.component}
          key={key}
        />
      );
    } else {
      return null;
    }
  });
}

export default routes;
export { getRoutes };
