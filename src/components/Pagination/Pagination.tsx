import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import {
  MdChevronLeft as PrevIcon,
  MdChevronRight as NextIcon
} from "react-icons/md"

import styles from "./Pagination.scss"
import { itemsPerPage } from "../../constants"

interface Props {
  currentPage: number
  onNextClick: () => void
  onPrevClick: () => void
  queryEndPoint: string
}

// TODO: Loading Component
// TODO: Error page?
const Pagination: React.SFC<Props> = props => {
  const { currentPage, onNextClick, onPrevClick, queryEndPoint } = props
  const paginationQuery = gql`
    query Pagination {
      ${queryEndPoint} {
        aggregate {
          count
        }
      }
    }
  `
  const handlePrevClick = () => currentPage > 1 && onPrevClick()
  const handleNextClick = (totalPages: number) => () =>
    totalPages > currentPage && onNextClick()
  return (
    <Query query={paginationQuery} fetchPolicy="network-only">
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>
        if (data.length === 0) return null
        const count = data[queryEndPoint].aggregate.count
        const totalPages = Math.ceil(count / itemsPerPage)
        const rangeStart = (currentPage - 1) * itemsPerPage + 1
        const rangeEnd =
          count > currentPage * itemsPerPage
            ? currentPage * itemsPerPage
            : count
        return (
          <div className={styles.container}>
            <span className={styles.count}>
              {`${rangeStart}-${rangeEnd} of ${count}`}
            </span>
            <div className={styles.navContainer}>
              <button
                onClick={handlePrevClick}
                className={styles.nav}
                disabled={currentPage === 1}
              >
                <PrevIcon />
              </button>
              <button
                onClick={handleNextClick(totalPages)}
                className={styles.nav}
                disabled={currentPage === totalPages}
              >
                <NextIcon />
              </button>
            </div>
          </div>
        )
      }}
    </Query>
  )
}

Pagination.defaultProps = {
  currentPage: 1
}

export default Pagination
