import React from "react"
import { Route, Switch } from "react-router-dom"

import { AddScreen, ListView } from "./screens"

const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={AddScreen} />
    <Route path="/add" component={AddScreen} />
    <Route path="/view" component={ListView} />
  </Switch>
)

export type AppRoute = "/" | "/add" | "/view"

export default Routes
