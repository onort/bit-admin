import React from "react"
import { Query, QueryResult } from "react-apollo"
import gql from "graphql-tag"

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      permissions
    }
  }
`

interface UserType {
  id: string
  email: string
  name: string
  permissions: string[]
}

interface Me {
  me: UserType | null
}

export interface UserQueryResponse extends QueryResult {
  data: Me | {}
}

// TODO: Types
const User = (props: any) => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
)

export default User
