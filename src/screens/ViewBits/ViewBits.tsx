import React, { Component } from "react"
import { RouteComponentProps } from "react-router"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import styles from "./ViewBits.scss"
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
import { BitsTable } from "./"
import { itemsPerPage } from "../../constants"
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

export interface State {
  currentPage: number
  message: string
  messageType: NotificationTypes
  showNotification: boolean
}

class ViewBits extends Component<RouteComponentProps, State> {
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
    this.props.history.push(`/view-bits/detail/${id}`)

  public toggleNotification = () =>
    this.setState({ showNotification: !this.state.showNotification })

  public render() {
    const { currentPage, message, messageType, showNotification } = this.state
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
                if (error) return <ErrorMessage message={error.message} />
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

export default ViewBits
