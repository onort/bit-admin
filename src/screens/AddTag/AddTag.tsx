import React, { Component } from "react"
import { Formik, FormikActions, FormikProps } from "formik"
import { Mutation, MutationFn } from "react-apollo"
import gql from "graphql-tag"

import styles from "./AddTag.scss"
import { AlertPortal } from "../../portals"
import { AlertTypes } from "../../components/Alert"
import { Alert, Container, Loading, Paper, Shell } from "../../components"
import { initialValues, Tag, TagForm, validationSchema } from "./"

const addTagMuatation = gql`
  mutation addTag(
    $name: String!
    $metaTitle: String
    $metaDescription: String
  ) {
    createTag(
      name: $name
      metaTitle: $metaTitle
      metaDescription: $metaDescription
    ) {
      id
    }
  }
`

interface State {
  showAlert: boolean
  messageType: AlertTypes
  message: string
}

class AddTag extends Component<any, State> {
  public state = {
    showAlert: false,
    messageType: "default" as AlertTypes,
    message: ""
  }

  public handleSubmit = (mutation: MutationFn<null, Tag>) => async (
    values: Tag,
    { resetForm, setSubmitting }: FormikActions<Tag>
  ) => {
    setSubmitting(true)
    try {
      await mutation({
        variables: {
          name: values.name.toLowerCase(),
          metaDescription: values.metaDescription,
          metaTitle: values.metaDescription
        }
      })
      resetForm()
      setSubmitting(false)
      this.setState({
        showAlert: true,
        messageType: "success",
        message: "Successfully added tag to databse."
      })
    } catch (e) {
      setSubmitting(false)
      this.setState({
        showAlert: true,
        messageType: "error",
        message: "An error has occured during saving tag."
      })
    }
    setTimeout(this.toggleAlert, 3500)
  }

  public toggleAlert = () => this.setState({ showAlert: !this.state.showAlert })

  public render() {
    const { showAlert, message, messageType } = this.state
    return (
      <Mutation mutation={addTagMuatation}>
        {(addTag, { loading, error }) => {
          return (
            <Shell>
              <Container narrow="narrow">
                <Paper className={styles.paper} elevation={2}>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit(addTag)}
                    render={(form: FormikProps<Tag>) => {
                      if (loading) return <Loading />
                      return <TagForm form={form} error={error} />
                    }}
                  />
                </Paper>
              </Container>
              {showAlert && (
                <AlertPortal>
                  <Alert message={message} type={messageType} />
                </AlertPortal>
              )}
            </Shell>
          )
        }}
      </Mutation>
    )
  }
}

export default AddTag
