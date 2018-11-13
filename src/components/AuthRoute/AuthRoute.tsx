import React from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { AuthConsumer } from "../../AuthContext"

const AuthRoute: React.SFC<RouteProps> = props => {
  return (
    <AuthConsumer>
      {({ state }) => (
        <> {state.isAuth ? <Route {...props} /> : <Redirect to="/" />}</>
      )}
    </AuthConsumer>
  )
}

export default AuthRoute
