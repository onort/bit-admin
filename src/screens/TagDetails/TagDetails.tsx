import React, { Component } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Mutation, MutationFn, Query } from "react-apollo"
import gql from "graphql-tag"
import { FormikActions } from "formik"

import { Container, Loading, Notification, Shell } from "../../components"
import { NotificationPortal } from "../../portals"
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

interface Props extends RouteComponentProps<{ tagId: string }> {}

interface State {
  editing: boolean
  message: string
  messageType: NotificationTypes
  showNotification: boolean
}

class TagDetails extends Component<Props, State> {
  public tagId = this.props.match.params.tagId

  public state = {
    editing: false,
    message: "",
    messageType: "default" as NotificationTypes,
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

  public toggleNotification = () =>
    this.setState({ showNotification: !this.state.showNotification })

  public render() {
    const { editing, message, messageType, showNotification } = this.state
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
                <DetailView tag={data.tag} onEditClick={this.toggleStatus} />
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
