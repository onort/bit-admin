import React, { Component } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import styles from "./ViewBits.scss"
import { Container, Pagination, Paper, Shell } from "../../components"
import { itemsPerPage } from "../../constants"
import { BitsTable } from "./"
import { format } from "../../utils"

const bitsQuery = gql`
 query bits($skip: Int = 0, $first: Int = ${itemsPerPage}) {
   bits(first: $first, skip: $skip, orderBy: createdAt_DESC) {
     id
     createdAt
     updatedAt
     contentText
     isPublished
     tags
   }
 }
`

export interface Bit {
  createdAt: string
  contentText: string
  id: string
  isPublished: boolean
  tags: string[]
  updatedAt: string
}

interface State {
  currentPage: number
}

class ViewBits extends Component<any, State> {
  public state = { currentPage: 1 }
  public handleNextClick = () =>
    this.setState({ currentPage: this.state.currentPage + 1 })
  public handlePrevClick = () =>
    this.setState({ currentPage: this.state.currentPage - 1 })
  public render() {
    const { currentPage } = this.state
    return (
      <Shell>
        <Container>
          <Paper className={styles.paper} elevation={2}>
            <Query
              query={bitsQuery}
              fetchPolicy="network-only"
              variables={{
                skip: (currentPage - 1) * itemsPerPage
              }}
            >
              {({ data, loading, error }) => {
                return (
                  <BitsTable
                    loading={loading}
                    data={format.convertISODateFromData(data.bits)}
                  />
                )
              }}
            </Query>
            <Pagination
              currentPage={currentPage}
              onNextClick={this.handleNextClick}
              onPrevClick={this.handlePrevClick}
              queryEndPoint="bitsConnection"
            />
          </Paper>
        </Container>
      </Shell>
    )
  }
}

export default ViewBits
