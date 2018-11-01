import React from "react"
import { Route, Switch } from "react-router-dom"

import { Add, ListView } from "./screens"

const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={Add} />
    <Route path="/add" component={Add} />
    <Route path="/view" component={ListView} />
  </Switch>
)

export type AppRoute = "/" | "/add" | "/view"

export default Routes
