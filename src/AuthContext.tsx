import React, { Component } from "react"
import { ApolloConsumer, graphql } from "react-apollo"

// TODO: Typecheck
const defaultValue = {
  state: { isAuth: false },
  onLogin: () => null,
  onLogout: () => null
}
const AuthContext = React.createContext(defaultValue)

class AuthProvider extends Component {
  public state = { isAuth: false }

  public handleLogin = (): any => {
    this.setState({ isAuth: true })
  }

  public handleLogout = (): any => {
    console.log("Hanldelogut clicked!")
  }

  public render() {
    return (
      <ApolloConsumer>
        {client => (
          <AuthContext.Provider
            value={{
              state: this.state,
              onLogin: this.handleLogin,
              onLogout: this.handleLogout
            }}
          >
            {this.props.children}
          </AuthContext.Provider>
        )}
      </ApolloConsumer>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider }
