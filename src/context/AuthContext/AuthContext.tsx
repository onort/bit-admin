import React, { Component } from "react"
import { graphql, compose, MutationFn, QueryResult } from "react-apollo"
import gql from "graphql-tag"

import { FormValues } from "../../screens/Login"

interface State {
  isAuth: boolean | null
  checkingAuth: boolean
}

// TODO: Typecheck for query result, mutation variables & execution result
interface Props {
  children: React.ReactChildren
  currentUserQuery: QueryResult
  signInMutation: MutationFn
  signOutMutation: MutationFn
}

const defaultValue = {
  state: { isAuth: null, checkingAuth: true },
  onLogin: (values: FormValues) => Promise.resolve(),
  onLogout: () => Promise.resolve()
}
const AuthContext = React.createContext(defaultValue)

class Auth extends Component<Props, State> {
  public state = { isAuth: null, checkingAuth: true }

  public handleLogin = async (values: FormValues): Promise<any> => {
    this.setState({ checkingAuth: true })
    const res: any = await this.props.signInMutation({
      variables: {
        email: values.email,
        password: values.password
      },
      refetchQueries: [{ query: currentUserQuery }]
    })

    if (res.data.signIn.id) {
      this.setState({ isAuth: true, checkingAuth: false })
    }
  }

  public handleLogout = async (): Promise<void> => {
    this.setState({ checkingAuth: true })
    await this.props.signOutMutation({
      refetchQueries: [{ query: currentUserQuery }]
    })
    this.setState({ isAuth: false, checkingAuth: false })
  }

  public static getDerivedStateFromProps(nextProps: any, prevState: State) {
    if (
      !!nextProps.currentUserQuery.me &&
      prevState.isAuth === null &&
      prevState.checkingAuth
    ) {
      return { ...prevState, isAuth: true, checkingAuth: false }
    } else if (
      !nextProps.currentUserQuery.me &&
      prevState.isAuth !== null &&
      prevState.checkingAuth
    ) {
      return { ...prevState, isAuth: false, checkingAuth: false }
    } else return prevState
  }

  public render() {
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          onLogin: this.handleLogin,
          onLogout: this.handleLogout
        }}
      >
        {this.props.currentUserQuery.loading ? (
          <p>Loading</p>
        ) : (
          this.props.children
        )}
      </AuthContext.Provider>
    )
  }
}

export const currentUserQuery = gql`
  query currentUser {
    currentUser {
      id
      email
      name
      permissions
    }
  }
`

const signInMutation = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      name
      id
      email
    }
  }
`

const signOutMutation = gql`
  mutation signOut {
    signOut {
      message
    }
  }
`

const AuthProvider = compose(
  graphql(currentUserQuery, { name: "currentUserQuery" }),
  graphql(signInMutation, { name: "signInMutation" }),
  graphql(signOutMutation, { name: "signOutMutation" })
)(Auth)
const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider }
