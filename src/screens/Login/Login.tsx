import React, { Component } from "react"

import styles from "./Login.scss"
import { Container, Paper } from "../../components"

class Login extends Component {
  public render() {
    return (
      <Container className={styles.container}>
        <Paper className={styles.paper} elevation={2}>
          <p>Paper content</p>
        </Paper>
      </Container>
    )
  }
}

export default Login
