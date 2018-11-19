import React from "react"
import { Route, Switch } from "react-router-dom"

import {
  AddScreen,
  AddTag,
  ListView,
  Login,
  Register,
  ViewTags
} from "./screens"
import { AuthRoute, NotFound } from "./components"

// TODO: Utilize AuthRoute
const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={Login} />
    <Route path="/add" component={AddScreen} />
    <Route path="/add-tag" component={AddTag} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/view" component={ListView} />
    <Route path="/view-tags" component={ViewTags} />
    <AuthRoute path="/authadd" component={AddScreen} />
    <Route component={NotFound} />
  </Switch>
)

export type AppRoute =
  | "/"
  | "/add"
  | "/add-tag"
  | "/login"
  | "/register"
  | "/view"
  | "/view-tags"

export default Routes
