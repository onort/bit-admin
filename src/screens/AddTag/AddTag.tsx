import React, { Component } from "react"
import { Field, Form, Formik, FormikActions, FormikProps } from "formik"
import { Mutation, MutationFn } from "react-apollo"
import { MdLocalOffer as TagIcon, MdArchive as SaveIcon } from "react-icons/md"
import gql from "graphql-tag"

import styles from "./AddTag.scss"
import { AlertPortal } from "../../portals"
import { AlertTypes } from "../../components/Alert"
import {
  Alert,
  Button,
  Container,
  ErrorMessage,
  FormInput,
  FormTitle,
  Loading,
  Paper,
  Shell
} from "../../components"
import validationSchema from "./validationSchema"

interface Tag {
  metaDescription: string
  metaTitle: string
  name: string
}

const initialValues: Tag = {
  metaDescription: "",
  metaTitle: "",
  name: ""
}

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
          metaDescription: values.metaDescription.toLowerCase(),
          metaTitle: values.metaDescription.toLowerCase()
        }
      })
      resetForm()
      setSubmitting(false)
      this.setState({
        showAlert: true,
        messageType: "success",
        message: "Successfully added tag to databse."
      })
      setTimeout(this.toggleAlert, 3500)
    } catch (e) {
      setSubmitting(false)
      this.setState({
        showAlert: true,
        messageType: "error",
        message: "An error has occured during saving tag."
      })
      setTimeout(this.toggleAlert, 3500)
    }
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
                      return (
                        <Form method="post">
                          <FormTitle title="Add New Tag" icon={<TagIcon />} />
                          {error && <ErrorMessage message={error.message} />}
                          <Field
                            type="text"
                            name="name"
                            placeholder="Tag name"
                            label="Tag Name"
                            component={FormInput}
                          />
                          <Field
                            type="text"
                            name="metaTitle"
                            placeholder="Title"
                            label="Title (Meta)"
                            component={FormInput}
                          />
                          <Field
                            type="text"
                            name="metaDescription"
                            placeholder="Description"
                            label="Description (Meta)"
                            component={FormInput}
                          />
                          <Button
                            text="Save Tag"
                            type="submit"
                            success={true}
                            disabled={form.isSubmitting}
                            icon={<SaveIcon />}
                          />
                        </Form>
                      )
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
