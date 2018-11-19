import React, { Component } from "react"
import { Field, Form, Formik, FormikActions, FormikProps } from "formik"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"

import styles from "./Login.scss"
import {
  Button,
  Container,
  Paper,
  FormInput,
  FormTitle,
  Loading,
  Wrapper
} from "../../components"
import { AuthConsumer } from "../../context"
import validationSchema from "./validationSchema"

export interface FormValues {
  email: string
  password: string
}

const initialValues: FormValues = {
  email: "",
  password: ""
}

class Login extends Component<RouteComponentProps> {
  public handleSubmit = (ctx: any) => async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikActions<FormValues>
  ): Promise<any> => {
    // Consider hashing password before sending to backend
    setSubmitting(true)
    resetForm()
    await ctx.onLogin(values)
    setSubmitting(false)
    this.props.history.push("/add")
  }
  public render() {
    return (
      <AuthConsumer>
        {ctx => (
          <Wrapper>
            <Container narrow="veryNarrow">
              <Paper className={styles.paper} elevation={2}>
                <FormTitle title="Login" />
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={this.handleSubmit(ctx)}
                  render={(form: FormikProps<FormValues>) => {
                    if (form.isSubmitting) return <Loading />
                    return (
                      <>
                        <Form method="post">
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
                        </Form>
                        <Link to="/register">
                          <Button
                            className={styles.button}
                            text="Register"
                            type="button"
                          />
                        </Link>
                      </>
                    )
                  }}
                />
              </Paper>
            </Container>
          </Wrapper>
        )}
      </AuthConsumer>
    )
  }
}

export default withRouter(Login)
