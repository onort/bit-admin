import React, { Component } from "react"
import { Mutation, Query, MutationFn } from "react-apollo"
import gql from "graphql-tag"
import { RouteComponentProps } from "react-router-dom"
import { FormikActions } from "formik"

import {
  Container,
  ErrorMessage,
  Loading,
  Notification,
  Shell
} from "../../components"
import { NotificationPortal } from "../../portals"
import { NotificationTypes } from "../../components/Notification"
import { DetailEdit, DetailView, UpdateBitForm, UpdateBitMutation } from "./"
import {
  covnertBitDataToInitialValues,
  editorStateToString
} from "../../utils/format"

const bitQuery = gql`
  query bit($id: ID!) {
    bit(where: { id: $id }) {
      id
      createdAt
      updatedAt
      contentHTML
      contentText
      imageCredit
      imageURL
      isPublished
      metaDescription
      metaTitle
      sourceCredit
      sourceURL
      tags
    }
  }
`

const bitUpdateMutation = gql`
  mutation bitUpdate(
    $content: String!
    $id: ID!
    $imageCredit: String
    $imageURL: String
    $isPublished: Boolean
    $metaDescription: String
    $metaTitle: String
    $sourceCredit: String
    $sourceURL: String
    $tags: [String!]!
  ) {
    updateBit(
      content: $content
      id: $id
      imageCredit: $imageCredit
      imageURL: $imageURL
      isPublished: $isPublished
      metaDescription: $metaDescription
      metaTitle: $metaTitle
      sourceCredit: $sourceCredit
      sourceURL: $sourceURL
      tags: $tags
    ) {
      id
    }
  }
`

interface Props extends RouteComponentProps<{ bitId: string }> {}

interface State {
  editing: boolean
  message: string
  messageType: NotificationTypes
  showNotification: boolean
}

// TODO: Modal Portal
// TODO: Modal Component
// TODO: Delete Flow
// TO CONSIDER: Move types and query & mutations to a seperate file?

class BitDetails extends Component<Props, State> {
  public bitId = this.props.match.params.bitId

  public state = {
    editing: false,
    message: "",
    messageType: "default" as NotificationTypes,
    showNotification: false
  }

  public toggleStatus = () => this.setState({ editing: !this.state.editing })

  public handleSubmit = (
    mutation: MutationFn<null, UpdateBitMutation>
  ) => async (
    values: UpdateBitForm,
    { setSubmitting }: FormikActions<UpdateBitForm>
  ) => {
    try {
      setSubmitting(true)
      // TO CONSIDER: Desctructure, format and delete unused props
      await mutation({
        variables: {
          id: this.bitId,
          content: editorStateToString(values.editorState),
          imageCredit: values.imageCredit,
          imageURL: values.imageURL,
          isPublished: values.isPublished,
          metaDescription: values.metaDescription,
          metaTitle: values.metaTitle,
          sourceCredit: values.sourceCredit,
          sourceURL: values.sourceURL,
          tags: values.tags
        },
        refetchQueries: [{ query: bitQuery, variables: { id: this.bitId } }]
      })
      setSubmitting(false)
      this.setState({
        editing: false,
        message: "Successfully updated tag.",
        messageType: "success",
        showNotification: true
      })
    } catch (e) {
      setSubmitting(false)
      this.setState({
        editing: false,
        message: "An error has occured during updating tag.",
        messageType: "error",
        showNotification: true
      })
    }
    setTimeout(this.toggleNotification, 3500)
  }

  public toggleNotification = () =>
    this.setState({ showNotification: !this.state.showNotification })

  public render() {
    const { editing, message, messageType, showNotification } = this.state
    return (
      <Shell>
        <Container>
          <Query query={bitQuery} variables={{ id: this.bitId }}>
            {({ data, loading: queryLoading, error: queryError }) => {
              if (queryLoading) return <Loading />
              if (queryError) {
                return <ErrorMessage message={queryError.message} />
              }
              const initialValues = covnertBitDataToInitialValues(data.bit)
              return editing ? (
                <Mutation mutation={bitUpdateMutation}>
                  {(
                    bitUpdate,
                    { loading: mutationLoading, error: mutationError }
                  ) => {
                    if (mutationLoading) return <Loading />
                    return (
                      <DetailEdit
                        error={mutationError}
                        initialValues={initialValues}
                        onToggle={this.toggleStatus}
                        onSubmit={this.handleSubmit}
                        mutation={bitUpdate}
                      />
                    )
                  }}
                </Mutation>
              ) : (
                <DetailView bit={data.bit} onEditClick={this.toggleStatus} />
              )
            }}
          </Query>
          {showNotification && (
            <NotificationPortal>
              <Notification message={message} type={messageType} />
            </NotificationPortal>
          )}
        </Container>
      </Shell>
    )
  }
}

export default BitDetails
