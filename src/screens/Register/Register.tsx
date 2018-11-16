import React, { Component } from "react"
import { Field, Form, Formik, FormikActions } from "formik"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Mutation, MutationFn } from "react-apollo"
import gql from "graphql-tag"

import styles from "./Register.scss"
import {
  Button,
  Container,
  ErrorMessage,
  FormInput,
  FormTitle,
  Paper
} from "../../components"
import validationSchema from "./validationSchema"
import { currentUserQuery } from "../../context/AuthContext/AuthContext"

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

const registerUserMutation = gql`
  mutation registerUser($email: String!, $name: String!, $password: String!) {
    registerUser(email: $email, name: $name, password: $password) {
      id
    }
  }
`

class Register extends Component<RouteComponentProps> {
  public handleSubmit = (mutation: MutationFn<null, FormValues>) => async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikActions<FormValues>
  ): Promise<any> => {
    setSubmitting(true)
    // Consider hashing password before sending to backend
    await mutation({
      variables: {
        email: values.email,
        name: values.name,
        password: values.password
      }
    })
    resetForm()
    setSubmitting(false)
    this.props.history.push("/add")
  }
  public render() {
    // refetch current user query can be omitted // redirect instead
    return (
      <Mutation
        mutation={registerUserMutation}
        refetchQueries={[{ query: currentUserQuery }]}
      >
        {(registerUser, { error, loading }) => {
          return (
            <Container narrow="veryNarrow">
              <Paper className={styles.paper} elevation={2}>
                <FormTitle title="Register" />
                {error && <ErrorMessage message={error.message} />}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={this.handleSubmit(registerUser)}
                  render={() => (
                    <Form method="post">
                      <fieldset disabled={loading} aria-busy={loading}>
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
                      </fieldset>
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

export default withRouter(Register)
