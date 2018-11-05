import React from "react"
import cx from "classnames"

import styles from "./AppMain.scss"

interface Props {
  className?: string
  sidebarOpen: boolean
}

const AppMain: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles.closed]: !props.sidebarOpen },
    props.className
  )
  return <main className={className}>{props.children}</main>
}

export default AppMain
