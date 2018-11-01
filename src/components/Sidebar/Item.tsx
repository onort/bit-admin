import React from "react"
import cx from "classnames"

import styles from "./Sidebar.scss"

interface Props {
  className?: string
  icon: React.ReactNode
  title: string
}

const Item: React.SFC<Props> = props => {
  const className = cx(styles.item, props.className)
  return (
    <div className={className}>
      <span className={styles.itemIcon}>{props.icon}</span>
      <span className={styles.itemTitle}>{props.title}</span>
    </div>
  )
}

export default Item
