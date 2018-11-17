import React from "react"
import cx from "classnames"

import styles from "./Table.scss"

interface Props {
  className?: string
  children: React.ReactNode
  dataIndex: string
  key: string
}

const Cell: React.SFC<Props> = props => {
  const { dataIndex, key } = props
  const className = cx(styles.cell, props.className)
  return (
    <td className={className} key={key}>
      {props.children}
    </td>
  )
}

export default Cell
