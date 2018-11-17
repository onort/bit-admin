import React from "react"
import cx from "classnames"

import styles from "./Table.scss"

export type Width =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16

interface Props {
  className?: string
  children: React.ReactNode
  dataIndex?: string
  width?: Width
}

const Cell: React.SFC<Props> = props => {
  const { dataIndex, width } = props
  const className = cx(
    styles.cell,
    { [styles[`width${width}`]]: width },
    props.className
  )
  return <td className={className}>{props.children}</td>
}

export default Cell
