import React, { Component } from "react"

interface AuthState {
  isAuth: boolean
}

const defaultValue: AuthState = { isAuth: false }
const AuthContext = React.createContext(defaultValue)

class AuthProvider extends Component<any, AuthState> {
  public state = { isAuth: false }

  public render() {
    return (
      <AuthContext.Provider value={{ isAuth: this.state.isAuth }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider, AuthState }
