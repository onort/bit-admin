import React, { Component } from "react"
import cx from "classnames"

import styles from "./Table.scss"
import { Body, Cell, Head, Row } from "./"
import { Alignment as CellAlignment, Width as CellWidth } from "./Cell"

// TODO: Dynamic Data interace?
interface Data {
  id: string
}

export interface Column {
  align?: CellAlignment
  dataIndex: string
  title: string
  width?: CellWidth
}

interface Props {
  className?: string
  data: any[]
  columns: Column[]
}

class Table extends Component<Props, any> {
  public render() {
    const className = cx(styles.table, this.props.className)
    const { data, columns } = this.props
    return (
      <table className={className}>
        <Head>
          <Row>
            {this.props.columns.map((column: Column) => (
              <Cell
                key={column.dataIndex}
                align={column.align}
                dataIndex={column.dataIndex}
                width={column.width}
              >
                {column.title}
              </Cell>
            ))}
          </Row>
        </Head>
        <Body>
          {data.map(cellData => (
            <Row key={cellData.id}>
              {columns.map((col: Column) => (
                <Cell
                  key={cellData.id + col.dataIndex}
                  align={col.align}
                  width={col.width}
                >
                  {!!cellData[col.dataIndex] ? cellData[col.dataIndex] : " - "}
                </Cell>
              ))}
            </Row>
          ))}
        </Body>
      </table>
    )
  }
}

export default Table
