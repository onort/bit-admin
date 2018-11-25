import React, { Component } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import styles from "./TagDetails.scss"
import { Container, Loading, Shell } from "../../components"
import { DetailView } from "./"

const tagQuery = gql`
  query tag($id: ID!) {
    tag(id: $id) {
      id
      createdAt
      updatedAt
      metaDescription
      metaTitle
      name
    }
  }
`

interface Props extends RouteComponentProps<{ tagId: string }> {}

class TagDetails extends Component<Props, any> {
  public state = { editting: false }

  public toggleStatus = () => this.setState({ editting: !this.state.editting })

  public render() {
    const id = this.props.match.params.tagId
    return (
      <Shell>
        <Container>
          <Query query={tagQuery} variables={{ id }} fetchPolicy="network-only">
            {({ data, loading, error }) => {
              console.log("data is", data)
              if (loading) return <Loading />
              else if (error) return <p>{error.message}</p>
              return (
                <DetailView tag={data.tag} onEditClick={this.toggleStatus} />
              )
            }}
          </Query>
        </Container>
      </Shell>
    )
  }
}

export default TagDetails
