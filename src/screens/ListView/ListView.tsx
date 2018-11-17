import React, { Component } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import styles from "./ListView.scss"
import { Shell } from "../../components"

const ALL_ENTRIES_QUERY = gql`
  query ALL_ENTRIES_QUERY {
    entries {
      id
      title
      description
    }
  }
`

class Add extends Component {
  public render() {
    return (
      <Query query={ALL_ENTRIES_QUERY}>
        {({ loading, error, data }) => {
          console.log(data)
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error: {error.message}</p>
          return (
            <Shell>
              <h3>ListView Screen</h3>
            </Shell>
          )
        }}
      </Query>
    )
  }
}

export default Add
