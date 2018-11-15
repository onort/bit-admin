import React from "react"
import { Route, Switch } from "react-router-dom"

import { AddScreen, AddTag, ListView, Login, Register } from "./screens"
import { AuthRoute } from "./components"

const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={Login} />
    <AuthRoute path="/add" component={AddScreen} />
    <Route path="/add-tag" component={AddTag} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/view" component={ListView} />
    <AuthRoute path="/authadd" component={AddScreen} />
  </Switch>
)

export type AppRoute =
  | "/"
  | "/add"
  | "/add-tag"
  | "/view"
  | "/login"
  | "/register"

export default Routes
