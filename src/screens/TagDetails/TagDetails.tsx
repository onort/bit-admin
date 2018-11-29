import React, { Component } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Mutation, MutationFn, Query } from "react-apollo"
import gql from "graphql-tag"
import { FormikActions } from "formik"

import {
  ConfirmationModal,
  Container,
  ErrorMessage,
  Loading,
  Notification,
  Shell
} from "../../components"
import { ModalPortal, NotificationPortal } from "../../portals"
import { NotificationTypes } from "../../components/Notification"
import { Tag } from "../AddTag"
import { DetailEdit, DetailView, TagMutation } from "./"

const tagQuery = gql`
  query tag($id: ID!) {
    tag(where: { id: $id }) {
      id
      createdAt
      updatedAt
      metaDescription
      metaTitle
      name
    }
  }
`

const tagUpdateMutation = gql`
  mutation tagUpdate(
    $id: ID!
    $metaDescription: String
    $metaTitle: String
    $name: String
  ) {
    updateTag(
      id: $id
      metaDescription: $metaDescription
      metaTitle: $metaTitle
      name: $name
    ) {
      id
    }
  }
`

const tagDeleteMutation = gql`
  mutation tagDelete($id: ID!) {
    deleteTag(id: $id) {
      message
    }
  }
`

interface Props extends RouteComponentProps<{ tagId: string }> {}

interface State {
  editing: boolean
  message: string
  messageType: NotificationTypes
  showModal: boolean
  showNotification: boolean
}

class TagDetails extends Component<Props, State> {
  public tagId = this.props.match.params.tagId

  public state = {
    editing: false,
    message: "",
    messageType: "default" as NotificationTypes,
    showModal: false,
    showNotification: false
  }

  public toggleStatus = () => this.setState({ editing: !this.state.editing })

  public handleSubmit = (mutation: MutationFn<null, TagMutation>) => async (
    values: Tag,
    { setSubmitting }: FormikActions<Tag>
  ) => {
    try {
      setSubmitting(true)
      await mutation({
        variables: { id: this.tagId, ...values },
        refetchQueries: [{ query: tagQuery, variables: { id: this.tagId } }]
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

  public handleDelete = (
    mutation: MutationFn<null, { id: string }>
  ) => async () => {
    try {
      await mutation()
      this.setState({
        message: "Successfully deleted tag from database.",
        messageType: "success",
        showModal: false,
        showNotification: true
      })
      // TODO: Pass state to new route, showNotification, message, messageType
      setTimeout(this.toggleNotification, 3500) // Won't be necessary
      this.props.history.push("/view-tags")
    } catch (e) {
      this.setState({
        message: "An error has occured during deleting tag.",
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
          <Query
            query={tagQuery}
            variables={{ id: this.tagId }}
            fetchPolicy="network-only"
          >
            {({ data, loading: queryLoading, error: queryError }) => {
              if (queryLoading) return <Loading />
              if (queryError) return <p>{queryError.message}</p>
              return !editing ? (
                <Mutation
                  mutation={tagDeleteMutation}
                  variables={{ id: data.tag.id }}
                >
                  {(
                    tagDelete,
                    { loading: deleteLoading, error: deleteError }
                  ) => {
                    if (deleteLoading) return <Loading />
                    if (deleteError) {
                      return <ErrorMessage message={deleteError.message} />
                    }
                    return (
                      <>
                        <DetailView
                          tag={data.tag}
                          onDeleteClick={this.toggleModal}
                          onEditClick={this.toggleStatus}
                        />
                        {showModal && (
                          <ModalPortal>
                            <ConfirmationModal
                              confirmText="Delete"
                              onCancel={this.toggleModal}
                              onConfirm={this.handleDelete(tagDelete)}
                              onClose={this.toggleModal}
                              text="Are you sure you want to delete this tag?"
                            />
                          </ModalPortal>
                        )}
                      </>
                    )
                  }}
                </Mutation>
              ) : (
                <Mutation mutation={tagUpdateMutation}>
                  {(
                    tagUpdate,
                    { loading: mutationLoading, error: mutationError }
                  ) => {
                    if (mutationLoading) return <Loading />
                    return (
                      <DetailEdit
                        error={mutationError}
                        initialValues={data.tag}
                        mutation={tagUpdate}
                        onSubmit={this.handleSubmit}
                        onToggle={this.toggleStatus}
                      />
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

export default TagDetails
