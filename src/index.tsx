import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

import "normalize.css"
import "minireset.css"
import App from "./App"
import { backendUrl } from "../config"

// TODO: add credentials
const client = new ApolloClient({
  uri: backendUrl
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
)
