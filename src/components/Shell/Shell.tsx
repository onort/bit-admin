import React from "react"

import styles from "./Shell.scss"
import { AppBar, AppContent, Sidebar } from "../"

const Shell: React.SFC = props => {
  return (
    <div className={styles.container}>
      <AppBar />
      <div className={styles.applicationMain}>
        <Sidebar />
        <AppContent>{props.children}</AppContent>
      </div>
    </div>
  )
}

export default Shell
