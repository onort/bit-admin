import React, { Component } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import styles from "./ViewTags.scss"
import {
  Container,
  ErrorMessage,
  Notification,
  Pagination,
  Paper,
  Shell
} from "../../components"
import { NotificationPortal } from "../../portals"
import { NotificationTypes } from "../../components/Notification"
import { ColumnType } from "../../components/Table"
import TagsTable from "./TagsTable"
import { itemsPerPage } from "../../constants"
import { format } from "../../utils"

const tagsQuery = gql`
  query tags($skip: Int = 0, $first: Int = ${itemsPerPage} ) {
    tags(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      createdAt
      updatedAt
      metaDescription
      metaTitle
      name
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

export interface State {
  currentPage: number
  message: string
  messageType: NotificationTypes
  showNotification: boolean
}

class ViewTags extends Component<RouteComponentProps, State> {
  public state = {
    currentPage: 1,
    message: "",
    messageType: "default" as NotificationTypes,
    showNotification: false
  }

  public componentDidMount() {
    const passedState: State = this.props.location.state
    if (passedState) {
      this.setState(passedState)
      if (passedState.showNotification) {
        setTimeout(this.toggleNotification, 3500)
      }
    }
  }

  public handleNextClick = () =>
    this.setState({ currentPage: this.state.currentPage + 1 })

  public handlePrevClick = () =>
    this.setState({ currentPage: this.state.currentPage - 1 })

  public handleRowClick = (id: string) =>
    this.props.history.push(`/view-tags/detail/${id}`)

  public toggleNotification = () =>
    this.setState({ showNotification: !this.state.showNotification })

  public render() {
    const { currentPage, message, messageType, showNotification } = this.state
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
                if (error) return <ErrorMessage message={error.message} />
                return (
                  <TagsTable
                    columns={columns}
                    data={format.convertISODateFromData(data.tags)}
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
              queryEndPoint="tagsConnection"
            />
          </Paper>
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

export default ViewTags
