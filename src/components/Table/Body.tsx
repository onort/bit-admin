import React from "react"
import cx from "classnames"

import styles from "./Table.scss"

interface Props {
  className?: string
  children: React.ReactNode
}

const Body: React.SFC<Props> = props => {
  const className = cx(styles.body, props.className)
  return <tbody className={className}>{props.children}</tbody>
}

export default Body
