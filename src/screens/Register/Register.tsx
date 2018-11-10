import React, { Component } from "react"
import { Field, Form, FormikProps } from "formik"

import styles from "./Register.scss"
import { Button, Container, Paper, FormInput } from "../../components"
import formEnchancer, { FormValues } from "./formEnhancer"

class Register extends Component<FormikProps<FormValues>> {
  public render() {
    return (
      <Container narrow="veryNarrow">
        <Paper className={styles.paper} elevation={2}>
          <h3 className={styles.title}>Register</h3>
          <Form>
            <Field
              type="text"
              name="name"
              placeholder="Your Name"
              label="Name"
              component={FormInput}
            />
            <Field
              type="text"
              name="email"
              placeholder="Your Email"
              label="Email"
              component={FormInput}
            />
            <Field
              type="password"
              name="password"
              placeholder="Your Password"
              label="Password"
              component={FormInput}
            />
            <Button
              className={styles.button}
              text="Register"
              type="submit"
              success={true}
            />
          </Form>
        </Paper>
      </Container>
    )
  }
}

const RegisterScreen = formEnchancer(Register)

export default RegisterScreen
