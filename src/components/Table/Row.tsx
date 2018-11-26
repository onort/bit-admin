import React from "react"
import cx from "classnames"

import styles from "./Table.scss"

interface Props {
  className?: string
  children: React.ReactChildren | React.ReactNode
  onClick?: () => void
}

const Row: React.SFC<Props> = props => {
  const className = cx(styles.row, props.className)
  return (
    <tr className={className} onClick={props.onClick}>
      {props.children}
    </tr>
  )
}

export default Row
