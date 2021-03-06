import React, { Component } from "react"
import { Formik, FormikActions, FormikProps } from "formik"
import { Mutation, MutationFn } from "react-apollo"
import gql from "graphql-tag"

import styles from "./AddTag.scss"
import { NotificationPortal } from "../../portals"
import { NotificationTypes } from "../../components/Notification"
import {
  Container,
  Loading,
  Notification,
  Paper,
  Shell
} from "../../components"
import { initialValues, TagForm, validationSchema } from "./"
import { Tag } from "../../types"

const addTagMuatation = gql`
  mutation addTag(
    $name: String!
    $metaTitle: String
    $metaDescription: String
    $slug: String!
  ) {
    createTag(
      name: $name
      metaTitle: $metaTitle
      metaDescription: $metaDescription
      slug: $slug
    ) {
      message
    }
  }
`

interface State {
  message: string
  messageType: NotificationTypes
  showNotification: boolean
}

class AddTag extends Component<any, State> {
  public state = {
    message: "",
    messageType: "default" as NotificationTypes,
    showNotification: false
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
          metaTitle: values.metaDescription,
          slug: values.slug.toLowerCase()
        }
      })
      resetForm()
      setSubmitting(false)
      this.setState({
        message: "Successfully added tag to databse.",
        messageType: "success",
        showNotification: true
      })
    } catch (e) {
      setSubmitting(false)
      this.setState({
        message: "An error has occured during saving tag.",
        messageType: "error",
        showNotification: true
      })
    }
    setTimeout(this.toggleNotification, 3500)
  }

  public toggleNotification = () =>
    this.setState({ showNotification: !this.state.showNotification })

  public render() {
    const { showNotification, message, messageType } = this.state
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

export default AddTag
