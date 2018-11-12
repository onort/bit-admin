import React, { Component } from "react"
import { Field, Form, Formik, FormikActions } from "formik"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"
import { Mutation, MutationFn } from "react-apollo"
import gql from "graphql-tag"

import styles from "./Login.scss"
import { Button, Container, Paper, FormInput } from "../../components"
import validationSchema from "./validationSchema"
import { CURRENT_USER_QUERY } from "../../components/User"

interface FormValues {
  email: string
  password: string
}

const initialValues: FormValues = {
  email: "",
  password: ""
}

const SIGNIN_USER_MUTATION = gql`
  mutation SIGNIN_USER($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      name
      id
      password
      email
    }
  }
`

class Login extends Component<RouteComponentProps> {
  public handleSubmit = (mutation: MutationFn<null, FormValues>) => async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikActions<FormValues>
  ): Promise<any> => {
    // Consider hashing password before sending to backend
    setSubmitting(true)
    await mutation({
      variables: {
        email: values.email,
        password: values.password
      }
    })
    resetForm()
    setSubmitting(false)
    this.props.history.push("/add")
  }
  public render() {
    // refetch current user quesy can be omitted // redirect
    return (
      <Mutation
        mutation={SIGNIN_USER_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signIn, { error, loading }) => {
          return (
            <Container narrow="veryNarrow">
              <Paper className={styles.paper} elevation={2}>
                <h3 className={styles.title}>Login</h3>
                {error && <p>{error.message}</p>}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={this.handleSubmit(signIn)}
                  render={() => (
                    <Form method="post">
                      <fieldset disabled={loading} aria-busy={loading}>
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
                        <Button
                          text="Login"
                          type="submit"
                          success={true}
                          className={styles.button}
                        />
                      </fieldset>
                    </Form>
                  )}
                />

                <Link to="/register">
                  <Button
                    className={styles.button}
                    text="Register"
                    type="button"
                  />
                </Link>
              </Paper>
            </Container>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(Login)
