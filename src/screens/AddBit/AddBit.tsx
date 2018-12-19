import React, { Component } from "react"
import { Formik, FormikActions, FormikProps } from "formik"
import { Mutation, MutationFn } from "react-apollo"
import gql from "graphql-tag"

import styles from "./AddBit.scss"
import {
  Container,
  Loading,
  Notification,
  Paper,
  Shell
} from "../../components"
import { BitForm, initialValues, validationSchema } from "./"
import { NotificationPortal } from "../../portals"
import { NotificationTypes } from "../../components/Notification"
import { editorStateToString } from "../../utils/format"
import { CreateBitForm, CreateBitMutation } from "../../types"

const addBitMutation = gql`
  mutation addBit(
    $content: String!
    $imageCredit: String
    $imageURL: String
    $metaDescription: String
    $metaTitle: String
    $sourceCredit: String
    $sourceURL: String
    $tagIds: [String!]!
  ) {
    createBit(
      content: $content
      imageCredit: $imageCredit
      imageURL: $imageURL
      metaDescription: $metaDescription
      metaTitle: $metaTitle
      sourceCredit: $sourceCredit
      sourceURL: $sourceURL
      tagIds: $tagIds
    ) {
      message
    }
  }
`

interface State {
  showNotification: boolean
  messageType: NotificationTypes
  message: string
}

// TODO: resetForm is not enough to reset values.tags?
class AddBit extends Component<any, State> {
  public state = {
    showNotification: false,
    messageType: "default" as NotificationTypes,
    message: ""
  }

  public handleSubmit = (
    mutation: MutationFn<null, CreateBitMutation>
  ) => async (
    values: CreateBitForm,
    { resetForm, setSubmitting }: FormikActions<CreateBitForm>
  ) => {
    setSubmitting(true)
    try {
      await mutation({
        variables: {
          content: editorStateToString(values.editorState),
          imageCredit: values.imageCredit,
          imageURL: values.imageURL,
          metaDescription: values.metaDescription,
          metaTitle: values.metaTitle,
          sourceCredit: values.sourceCredit,
          sourceURL: values.sourceURL,
          tagIds: values.tags.map(tag => tag.id)
        }
      })
      resetForm()
      setSubmitting(false)
      this.setState({
        showNotification: true,
        messageType: "success",
        message: "Successfully added bit to databse."
      })
    } catch (e) {
      setSubmitting(false)
      this.setState({
        showNotification: true,
        messageType: "error",
        message: "An error has occured during saving bit."
      })
    }
    setTimeout(this.toggleNotification, 3500)
  }

  public toggleNotification = () =>
    this.setState({ showNotification: !this.state.showNotification })

  public render() {
    const { showNotification, message, messageType } = this.state
    return (
      <Mutation mutation={addBitMutation}>
        {(addBit, { loading, error }) => {
          return (
            <Shell>
              <Container narrow="narrow">
                <Paper className={styles.paper} elevation={2}>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={this.handleSubmit(addBit)}
                    validationSchema={validationSchema}
                    render={(form: FormikProps<CreateBitForm>) => {
                      if (loading) return <Loading />
                      return <BitForm form={form} error={error} />
                    }}
                  />
                </Paper>
              </Container>
              {showNotification && (
                <NotificationPortal>
                  <Notification message={message} type={messageType} />
                </NotificationPortal>
              )}
            </Shell>
          )
        }}
      </Mutation>
    )
  }
}

export default AddBit
