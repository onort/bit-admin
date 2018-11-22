import React, { Component } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import styles from "./ViewTags.scss"
import { Container, Pagination, Paper, Shell } from "../../components"
import { ColumnType } from "../../components/Table"
import TagsTable from "./TagsTable"
import { itemsPerPage } from "../../constants"
import { format } from "../../utils"

const tagsQuery = gql`
  query tags($skip: Int = 0, $first: Int = ${itemsPerPage} ) {
    tags(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      metaDescription
      metaTitle
      name
      createdAt
      updatedAt
    }
  }
`

const columns: ColumnType[] = [
  { dataIndex: "name", title: "Name", width: 4 },
  { dataIndex: "metaTitle", title: "Title (Meta)", width: 4 },
  { dataIndex: "metaDescription", title: "Description (Meta)", width: 4 },
  { dataIndex: "createdAt", title: "Created", width: 2, align: "center" },
  { dataIndex: "updatedAt", title: "Last Update", width: 2, align: "center" }
]

interface State {
  currentPage: number
}

// TODO: Error Page / Error Component / Error Alert ?
class ViewTags extends Component<any, State> {
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
              query={tagsQuery}
              fetchPolicy="network-only"
              variables={{
                skip: (currentPage - 1) * itemsPerPage
              }}
            >
              {({ data, loading, error }) => {
                if (error) return <p>Error: {error.message}</p>
                return (
                  <TagsTable
                    data={format.convertISODateFromData(data.tags)}
                    columns={columns}
                    loading={loading}
                  />
                )
              }}
            </Query>
            <Pagination
              currentPage={currentPage}
              onNextClick={this.handleNextClick}
              onPrevClick={this.handlePrevClick}
              queryEndPoint="tagsConnection"
            />
          </Paper>
        </Container>
      </Shell>
    )
  }
}

export default ViewTags
