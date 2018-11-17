import React from "react"
import cx from "classnames"

import styles from "./Table.scss"

interface Props {
  className?: string
  children: React.ReactNode
}

const Head: React.SFC<Props> = props => {
  const className = cx(styles.head, props.className)
  return <thead className={className}>{props.children}</thead>
}

export default Head
