import React from "react";
import { Switch, Redirect } from "react-router-dom";
import routes, { getRoutes } from "routes.js";

const layout = () => (
  <div>
    {/* Page content */}

    {/* roteamento do layout */}
    <Switch>
      {getRoutes(routes, "/app")}
      <Redirect from="*" to="/app/login" />
    </Switch>
  </div>
);

export default layout;
