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
  Loading,
  Paper,
  Wrapper
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
    this.props.history.push("/add-bit")
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
            <Wrapper>
              <Container narrow="veryNarrow">
                <Paper className={styles.paper} elevation={2}>
                  <FormTitle title="Register" />
                  {error && <ErrorMessage message={error.message} />}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit(registerUser)}
                    render={() => {
                      if (loading) return <Loading />
                      return (
                        <Form method="post">
                          <Field
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            label="Name"
                            required={true}
                            component={FormInput}
                          />
                          <Field
                            type="text"
                            name="email"
                            placeholder="Your Email"
                            label="Email"
                            required={true}
                            component={FormInput}
                          />
                          <Field
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            label="Password"
                            required={true}
                            component={FormInput}
                          />
                          <Button
                            className={styles.button}
                            text="Register"
                            type="submit"
                            success={true}
                          />
                        </Form>
                      )
                    }}
                  />
                </Paper>
              </Container>
            </Wrapper>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(Register)
