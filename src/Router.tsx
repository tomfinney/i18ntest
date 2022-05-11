import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} component={HomePage} exact />
      </Switch>
    </BrowserRouter>
  );
}
