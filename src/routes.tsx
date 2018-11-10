import React from "react"
import { Route, Switch } from "react-router-dom"

import { AddScreen, ListView, Login } from "./screens"

const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={Login} />
    <Route path="/add" component={AddScreen} />
    <Route path="/login" component={Login} />
    <Route path="/view" component={ListView} />
  </Switch>
)

export type AppRoute = "/" | "/add" | "/view" | "/login"

export default Routes
