import React, { Component } from "react"
import { FastField, Field, Form, Formik, FormikActions } from "formik"
import { MdArchive as SaveIcon } from "react-icons/md"
import { Mutation, MutationFn } from "react-apollo"
import gql from "graphql-tag"

import styles from "./AddBit.scss"
import {
  Alert,
  Button,
  Container,
  ErrorMessage,
  FormInput,
  FormTagField,
  FormTextEditor,
  FormTitle,
  Loading,
  Paper,
  Shell
} from "../../components"
import { Bit, initialValues, validationSchema } from "./formHelpers"
import { AlertTypes } from "../../components/Alert"
import { AlertPortal } from "../../portals"
import { format } from "../../utils"

const addBitMutation = gql`
  mutation addBit(
    $content: String!
    $imageCredit: String
    $imageURL: String
    $metaDescription: String
    $metaTitle: String
    $sourceCredit: String
    $sourceURL: String
    $tags: [String!]!
  ) {
    createBit(
      content: $content
      imageCredit: $imageCredit
      imageURL: $imageURL
      metaDescription: $metaDescription
      metaTitle: $metaTitle
      sourceCredit: $sourceCredit
      sourceURL: $sourceURL
      tags: $tags
    ) {
      message
    }
  }
`

interface State {
  showAlert: boolean
  messageType: AlertTypes
  message: string
}

// TODO: MutationFn Options Type
// TODO: Tag Type &  AutoComplete
// TODO: resetForm is not enough to reset values.tags?
class AddBit extends Component<any, State> {
  public state = {
    showAlert: false,
    messageType: "default" as AlertTypes,
    message: ""
  }

  public handleSubmit = (mutation: MutationFn<null, any>) => async (
    values: Bit,
    { resetForm, setSubmitting }: FormikActions<Bit>
  ) => {
    setSubmitting(true)
    try {
      await mutation({
        variables: {
          content: format.editorStateToString(values.editorState),
          imageCredit: values.imageCredit,
          imageURL: values.imageURL,
          metaDescription: values.metaDescription,
          metaTitle: values.metaTitle,
          sourceCredit: values.sourceCredit,
          sourceURL: values.sourceURL,
          tags: values.tags
        }
      })
      resetForm()
      setSubmitting(false)
      this.setState({
        showAlert: true,
        messageType: "success",
        message: "Successfully added bit to databse."
      })
    } catch (e) {
      setSubmitting(false)
      this.setState({
        showAlert: true,
        messageType: "error",
        message: "An error has occured during saving bit."
      })
    }
    setTimeout(this.toggleAlert, 3500)
  }

  public toggleAlert = () => this.setState({ showAlert: !this.state.showAlert })

  public render() {
    const { showAlert, message, messageType } = this.state
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
                    render={() => {
                      if (loading) return <Loading />
                      return (
                        <Form>
                          <FormTitle title="Add New Bit" />
                          {error && <ErrorMessage message={error.message} />}
                          <FastField
                            name="editorState"
                            component={FormTextEditor}
                          />
                          <Field
                            type="text"
                            name="tagToAdd"
                            placeholder=""
                            label="Tags"
                            tagsarrayname="tags"
                            required={true}
                            component={FormTagField}
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
                          <Field
                            type="text"
                            name="imageURL"
                            placeholder="Image URL"
                            label="Image URL"
                            component={FormInput}
                          />
                          <Field
                            type="text"
                            name="imageCredit"
                            placeholder="Image Source"
                            label="Image Source"
                            component={FormInput}
                          />
                          <Field
                            type="text"
                            name="sourceCredit"
                            placeholder="Source"
                            label="Source"
                            component={FormInput}
                          />
                          <Field
                            type="text"
                            name="sourceURL"
                            placeholder="Source URL"
                            label="Source URL"
                            component={FormInput}
                          />
                          <Button
                            className={styles.submit}
                            text="Submit"
                            type="submit"
                            success={true}
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

export default AddBit
