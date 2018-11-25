import React from "react"
import { Route, Switch } from "react-router-dom"

import {
  AddBit,
  AddTag,
  ListView,
  Login,
  Register,
  TagDetails,
  ViewBits,
  ViewTags
} from "./screens"
import { AuthRoute, NotFound } from "./components"

// TODO: Utilize AuthRoute
const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={Login} />
    <Route path="/add-bit" component={AddBit} />
    <Route path="/add-tag" component={AddTag} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/view" component={ListView} />
    <Route path="/view-bits" component={ViewBits} />
    <Route path="/view-tags/detail/:id" component={TagDetails} />
    <Route path="/view-tags" component={ViewTags} />
    <AuthRoute path="/authadd" component={AddBit} />
    <Route component={NotFound} />
  </Switch>
)

export type AppRoute =
  | "/"
  | "/add-bit"
  | "/add-tag"
  | "/login"
  | "/register"
  | "/view"
  | "/view-bits"
  | "/view-tags"
  | "/view-tags/detail"

export default Routes
