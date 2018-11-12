import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import ApolloClient, { Operation, HttpLink } from "apollo-boost"
import { ApolloProvider } from "react-apollo"

import "normalize.css"
import "minireset.css"
import App from "./App"
import { AuthProvider } from "./AuthContext"
import { backendUrl } from "../config"

const client = new ApolloClient({
  uri: backendUrl,
  request: async (operation: Operation) => {
    operation.setContext({
      fetchOptions: {
        credentials: "include"
      }
    })
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
)
