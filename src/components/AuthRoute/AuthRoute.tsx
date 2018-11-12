import React from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { AuthConsumer, AuthState } from "../../AuthContext"

const AuthRoute: React.SFC<RouteProps> = props => {
  return (
    <AuthConsumer>
      {({ isAuth }: AuthState) => (
        <> {isAuth ? <Route {...props} /> : <Redirect to="/" />}</>
      )}
    </AuthConsumer>
  )
}

export default AuthRoute
