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

export type Alignment = "left" | "center" | "right"

interface Props {
  className?: string
  children: React.ReactNode
  align?: Alignment
  dataIndex?: string
  width?: Width
}

const Cell: React.SFC<Props> = props => {
  const { align, dataIndex, width } = props
  const className = cx(
    styles.cell,
    {
      [styles[`width-${width}`]]: width,
      [styles[`${align}`]]: align
    },
    props.className
  )
  return <td className={className}>{props.children}</td>
}

Cell.defaultProps = {
  align: "left"
}

export default Cell
