import React from "react"
import cx from "classnames"

import styles from "./AppContent.scss"

interface Props {
  className?: string
  sidebarOpen: boolean
}

const AppContent: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles.closed]: !props.sidebarOpen },
    props.className
  )
  return (
    <main className={className}>
      <div className={styles.inner}>
        <p>This is content area.</p>
        {props.children}
      </div>
    </main>
  )
}

export default AppContent
