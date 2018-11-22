import React, { Component } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import styles from "./ViewBits.scss"
import { Container, Paper, Shell } from "../../components"
import { itemsPerPage } from "../../constants"

const bitsQuery = gql`
 query bits($skip: Int = 0, $first: Int = ${itemsPerPage}) {
   bits(first: $first, skip: $skip, orderBy: createdAt_DESC) {
     id
   }
 }
`

interface State {
  currentPage: number
}

class ViewBits extends Component<any, State> {
  public state = { currentPage: 1 }
  public render() {
    const { currentPage } = this.state
    return (
      <Shell>
        <Container>
          <Paper elevation={2}>
            <Query
              query={bitsQuery}
              fetchPolicy="network-only"
              variables={{
                skip: (currentPage - 1) * itemsPerPage
              }}
            >
              {({ data, loading, error }) => {
                return <p>This is ViewBits.</p>
              }}
            </Query>
          </Paper>
        </Container>
      </Shell>
    )
  }
}

export default ViewBits
