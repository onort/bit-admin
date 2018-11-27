import React, { Component } from "react"
import { Mutation, Query, MutationFn } from "react-apollo"
import gql from "graphql-tag"
import { RouteComponentProps } from "react-router-dom"
import { FormikActions } from "formik"

import styles from "./BitDetails.scss"
import {
  Alert,
  Container,
  ErrorMessage,
  Loading,
  Shell
} from "../../components"
import { AlertPortal } from "../../portals"
import { AlertTypes } from "../../components/Alert"
import { DetailEdit, DetailView } from "./"
import {
  covnertBitDataToInitialValues,
  editorStateToString
} from "../../utils/format"
import { Bit } from "../AddBit"

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

export interface BitEdit extends Bit {
  content?: string
  contentHTML?: string
  contentText?: string
  id: string
  isPublished: boolean
}

interface Props extends RouteComponentProps<{ bitId: string }> {}

interface State {
  editing: boolean
  message: string
  messageType: AlertTypes
  showAlert: boolean
}

// TODO: Better Typings
// TODO: Modal Portal
// TODO: Modal Component
// TODO: Delete Flow
// TO CONSIDER: Move types and query & mutations to a seperate file?

class BitDetails extends Component<Props, State> {
  public bitId = this.props.match.params.bitId

  public state = {
    editing: false,
    message: "",
    messageType: "default" as AlertTypes,
    showAlert: false
  }

  public toggleStatus = () => this.setState({ editing: !this.state.editing })

  public handleSubmit = (mutation: MutationFn<null, any>) => async (
    values: BitEdit,
    { setSubmitting }: FormikActions<BitEdit>
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
        showAlert: true
      })
    } catch (e) {
      setSubmitting(false)
      this.setState({
        editing: false,
        message: "An error has occured during updating tag.",
        messageType: "error",
        showAlert: true
      })
    }
    setTimeout(this.toggleAlert, 3500)
  }

  public toggleAlert = () => this.setState({ showAlert: !this.state.showAlert })

  public render() {
    const { editing, message, messageType, showAlert } = this.state
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
          {showAlert && (
            <AlertPortal>
              <Alert message={message} type={messageType} />
            </AlertPortal>
          )}
        </Container>
      </Shell>
    )
  }
}

export default BitDetails
