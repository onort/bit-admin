import React, { Component } from "react"
import { Field, Form, FormikProps } from "formik"
import { Link } from "react-router-dom"

import styles from "./Login.scss"
import { Button, Container, Paper, FormInput } from "../../components"
import formEnhancer, { FormValues } from "./formEnhancer"

class Login extends Component<FormikProps<FormValues>> {
  public render() {
    return (
      <Container narrow="veryNarrow">
        <Paper className={styles.paper} elevation={2}>
          <Form>
            <h3 className={styles.title}>Login</h3>
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
          <Button
            text="Login"
            type="submit"
            success={true}
            className={styles.button}
          />
          <Link to="/register">
            <Button className={styles.button} text="Register" type="button" />
          </Link>
        </Paper>
      </Container>
    )
  }
}

const LoginScreen = formEnhancer(Login)

export default LoginScreen
