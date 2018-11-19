import React, { Component } from "react"
import cx from "classnames"

import styles from "./Table.scss"
import { NoData } from "../"
import { Body, Cell, Head, Row } from "./"
import { Alignment as CellAlignment, Width as CellWidth } from "./Cell"
import Loading from "../Loading"

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
  columns: Column[]
  data: any[]
  loading?: boolean
}

class Table extends Component<Props, any> {
  public render() {
    const className = cx(styles.table, this.props.className)
    const { data, columns, loading } = this.props
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
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
                      {!!cellData[col.dataIndex]
                        ? cellData[col.dataIndex]
                        : " - "}
                    </Cell>
                  ))}
                </Row>
              ))}
            </Body>
          </table>
        )}
        {data && data.length === 0 && <NoData />}
      </>
    )
  }
}

export default Table
