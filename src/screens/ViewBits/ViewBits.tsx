import React, { Component } from "react"
import { RouteComponentProps } from "react-router"
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

class ViewBits extends Component<RouteComponentProps, State> {
  public state = { currentPage: 1 }

  public handleNextClick = () =>
    this.setState({ currentPage: this.state.currentPage + 1 })

  public handlePrevClick = () =>
    this.setState({ currentPage: this.state.currentPage - 1 })

  public handleRowClick = (id: string) =>
    this.props.history.push(`/view-bits/detail/${id}`)

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
                    data={format.convertISODateFromData(data.bits)}
                    loading={loading}
                    onRowClick={this.handleRowClick}
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
