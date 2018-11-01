import React from "react"
import cx from "classnames"

import styles from "./Sidebar.scss"

interface Props {
  className?: string
  sidebarOpen: boolean
}

const Sidebar: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles.closed]: !props.sidebarOpen },
    props.className
  )
  return (
    <nav className={className}>
      <h3>Hello</h3>
    </nav>
  )
}

export default Sidebar
