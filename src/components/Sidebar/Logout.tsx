import React from "react"
import { Mutation } from "react-apollo"
import { MdExitToApp as LogoutIcon } from "react-icons/md"
import gql from "graphql-tag"
import cx from "classnames"

import styles from "./Sidebar.scss"
import { CURRENT_USER_QUERY } from "../User"
import { AuthConsumer } from "../../AuthContext"

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT {
    signOut {
      message
    }
  }
`

const Logout: React.SFC = props => {
  const className = cx(styles.item, styles.logout)
  const handleLogout = (signOut: any, ctx: any): any => {
    signOut()
    ctx.onLogout()
  }
  // redirect after signOut mutation?
  return (
    <AuthConsumer>
      {(ctx: any) => (
        <Mutation
          mutation={SIGN_OUT_MUTATION}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(signOut: any) => {
            return (
              <a className={className} onClick={handleLogout(signOut, ctx)}>
                <span className={styles.itemIcon}>
                  <LogoutIcon />
                </span>
                <span className={styles.itemTitle}>Logout</span>
              </a>
            )
          }}
        </Mutation>
      )}
    </AuthConsumer>
  )
}

export default Logout
