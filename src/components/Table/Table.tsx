import React, { Component, Children } from "react"
import cx from "classnames"

import styles from "./Table.scss"
import { NoData } from "../"
import { Body, Cell, Head, Row } from "./"
import { Alignment as CellAlignment, Width as CellWidth } from "./Cell"
import Loading from "../Loading"

export interface Column {
  align?: CellAlignment
  dataIndex: string
  title: string
  width?: CellWidth
}

interface Props {
  className?: string
  children: React.ReactNode
  loading?: boolean
}

const Table: React.SFC<Props> = props => {
  const className = cx(styles.table, props.className)
  const { loading } = props
  return loading ? (
    <Loading />
  ) : (
    <table className={className}>{props.children}</table>
  )
}

export default Table
