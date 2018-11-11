import React, { Component } from "react"
import { Field, Form, FormikProps, Formik } from "formik"
import { Mutation, MutationFn } from "react-apollo"
import gql from "graphql-tag"

import styles from "./Register.scss"
import { Button, Container, Paper, FormInput } from "../../components"
import validationSchema from "./validationSchema"

interface FormValues {
  email: string
  name: string
  password: string
}

const initialValues: FormValues = {
  email: "",
  name: "",
  password: ""
}

const REGISTER_USER_MUTATION = gql`
  mutation REGISTER($email: String!, $name: String!, $password: String!) {
    registerUser(email: $email, name: $name, password: $password) {
      name
      id
      password
      email
    }
  }
`

class Register extends Component<FormikProps<FormValues>> {
  public handleSubmit = (mutation: MutationFn<null, FormValues>) => (
    values: FormValues
  ) => {
    mutation({
      variables: {
        email: values.email,
        name: values.name,
        password: values.password
      }
    })
  }
  public render() {
    return (
      <Mutation mutation={REGISTER_USER_MUTATION}>
        {(registerUser, { data, error, loading }) => {
          return (
            <Container narrow="veryNarrow">
              <Paper className={styles.paper} elevation={2}>
                <h3 className={styles.title}>Register</h3>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={this.handleSubmit(registerUser)}
                  render={() => (
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
                  )}
                />
              </Paper>
            </Container>
          )
        }}
      </Mutation>
    )
  }
}

export default Register
