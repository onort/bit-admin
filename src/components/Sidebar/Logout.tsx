import React from "react"
import { Mutation } from "react-apollo"
import { MdExitToApp as LogoutIcon } from "react-icons/md"
import gql from "graphql-tag"
import cx from "classnames"

import styles from "./Sidebar.scss"
import { CURRENT_USER_QUERY } from "../User"

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT {
    signOut {
      message
    }
  }
`

const Logout: React.SFC = props => {
  const className = cx(styles.item, styles.logout)
  // redirect after signOut mutation?
  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signOut: any) => {
        return (
          <a className={className} onClick={signOut}>
            <span className={styles.itemIcon}>
              <LogoutIcon />
            </span>
            <span className={styles.itemTitle}>Logout</span>
          </a>
        )
      }}
    </Mutation>
  )
}

export default Logout
