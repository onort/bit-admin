import React from "react"
import { MdExitToApp as LogoutIcon } from "react-icons/md"
import cx from "classnames"

import styles from "./Sidebar.scss"
import { AuthConsumer } from "../../context/"

const Logout: React.SFC = () => {
  const className = cx(styles.item, styles.logout)
  const handleLogout = (ctx: any): any => async () => {
    console.log("handleLogin in logout component ran")
    await ctx.onLogout()
  }

  return (
    <AuthConsumer>
      {(ctx: any) => (
        <a className={className} onClick={handleLogout(ctx)}>
          <span className={styles.itemIcon}>
            <LogoutIcon />
          </span>
          <span className={styles.itemTitle}>Logout</span>
        </a>
      )}
    </AuthConsumer>
  )
}

export default Logout
