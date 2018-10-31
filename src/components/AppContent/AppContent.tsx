import React from "react"

import styles from "./AppContent.scss"

const AppContent: React.SFC = props => {
  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <p>This is content area.</p>
        {props.children}
      </div>
    </main>
  )
}

export default AppContent
