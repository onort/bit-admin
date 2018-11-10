import React, { Component } from "react"
import { Field, Form, FormikProps } from "formik"

import styles from "./Login.scss"
import { Button, Container, Paper, FormInput } from "../../components"
import formEnhancer, { FormValues } from "./formEnhancer"

class Login extends Component<FormikProps<FormValues>> {
  public render() {
    return (
      <Container className={styles.container}>
        <Paper className={styles.paper} elevation={2}>
          <Form>
            <h3>Login</h3>
            <Field
              type="text"
              name="email"
              placeholder="exmaple@mail.com"
              label="Email"
              component={FormInput}
            />
            <Field
              type="password"
              name="password"
              placeholder="password"
              label="Password"
              component={FormInput}
            />
          </Form>
          <Button text="Login" type="submit" />
        </Paper>
      </Container>
    )
  }
}

const LoginScreen = formEnhancer(Login)

export default LoginScreen
