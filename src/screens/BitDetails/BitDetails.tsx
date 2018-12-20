import React, { Component } from "react"
import { Mutation, Query, MutationFn } from "react-apollo"
import gql from "graphql-tag"
import { RouteComponentProps } from "react-router-dom"
import { FormikActions } from "formik"

import {
  Container,
  ConfirmationModal,
  ErrorMessage,
  Loading,
  Notification,
  Shell
} from "../../components"
import { ModalPortal, NotificationPortal } from "../../portals"
import { NotificationTypes } from "../../components/Notification"
import { ViewBitsState } from "../ViewBits"
import { DetailEdit, DetailView } from "./"
import {
  covnertBitDataToInitialValues,
  editorStateToString
} from "../../utils/format"
import { UpdateBitForm, UpdateBitMutation } from "../../types"

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
      tags {
        id
        name
      }
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
    $tagIds: [String!]!
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
      tagIds: $tagIds
    ) {
      message
    }
  }
`

const bitDeleteMutation = gql`
  mutation bitDelete($id: ID!) {
    deleteBit(id: $id) {
      message
    }
  }
`

interface Props extends RouteComponentProps<{ bitId: string }> {}

interface State {
  editing: boolean
  message: string
  messageType: NotificationTypes
  showModal: boolean
  showNotification: boolean
}

// TO CONSIDER: Move query & mutations to a seperate file?
class BitDetails extends Component<Props, State> {
  public bitId = this.props.match.params.bitId

  public state = {
    editing: false,
    message: "",
    messageType: "default" as NotificationTypes,
    showModal: false,
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
          tagIds: values.tags.map(tag => tag.id)
        },
        refetchQueries: [{ query: bitQuery, variables: { id: this.bitId } }]
      })
      setSubmitting(false)
      this.setState({
        editing: false,
        message: "Successfully updated bit.",
        messageType: "success",
        showNotification: true
      })
    } catch (e) {
      setSubmitting(false)
      this.setState({
        editing: false,
        message: "An error has occured during updating bit.",
        messageType: "error",
        showNotification: true
      })
    }
    setTimeout(this.toggleNotification, 3500)
  }

  public handleDelete = (
    mutation: MutationFn<null, { id: string }>
  ) => async () => {
    try {
      await mutation()
      this.setState({
        showModal: false
      })
      this.props.history.push({
        pathname: "/view-bits",
        state: {
          currentPage: 1,
          message: "Successfully deleted bit from database.",
          messageType: "success",
          showNotification: true
        } as ViewBitsState
      })
    } catch (e) {
      this.setState({
        message: "An error has occured during deleting bit.",
        messageType: "error",
        showModal: false,
        showNotification: true
      })
      setTimeout(this.toggleNotification, 3500)
    }
  }

  public toggleNotification = () =>
    this.setState({ showNotification: !this.state.showNotification })

  public toggleModal = () => this.setState({ showModal: !this.state.showModal })

  public render() {
    const {
      editing,
      message,
      messageType,
      showModal,
      showNotification
    } = this.state
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
                    { loading: updateLoading, error: updateError }
                  ) => {
                    if (updateLoading) return <Loading />
                    return (
                      <DetailEdit
                        error={updateError}
                        initialValues={initialValues}
                        onSubmit={this.handleSubmit}
                        onViewClick={this.toggleStatus}
                        mutation={bitUpdate}
                      />
                    )
                  }}
                </Mutation>
              ) : (
                <Mutation
                  mutation={bitDeleteMutation}
                  variables={{ id: data.bit.id }}
                >
                  {(
                    bitDelete,
                    { loading: deleteLoading, error: deleteError }
                  ) => {
                    if (deleteLoading) return <Loading />
                    if (deleteError) {
                      return <ErrorMessage message={deleteError.message} />
                    }
                    return (
                      <>
                        <DetailView
                          bit={data.bit}
                          onDeleteClick={this.toggleModal}
                          onEditClick={this.toggleStatus}
                        />
                        {showModal && (
                          <ModalPortal>
                            <ConfirmationModal
                              confirmText="Delete"
                              onCancel={this.toggleModal}
                              onConfirm={this.handleDelete(bitDelete)}
                              onClose={this.toggleModal}
                              text="Are you sure you want to delete this bit?"
                            />
                          </ModalPortal>
                        )}
                      </>
                    )
                  }}
                </Mutation>
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
