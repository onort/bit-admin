import React from "react"

import {
  NoData,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "../../components"
import { ColumnType as Column } from "../../components/Table"

interface Props {
  columns: Column[]
  data: any[]
  loading?: boolean
}

const TagsTable: React.SFC<Props> = props => {
  const { columns, data, loading } = props
  return (
    <>
      <Table loading={loading}>
        <TableHead>
          <TableRow>
            {columns.map((column: Column) => (
              <TableCell
                key={column.dataIndex}
                align={column.align}
                dataIndex={column.dataIndex}
                width={column.width}
              >
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(cellData => (
            <TableRow key={cellData.id}>
              {columns.map((col: Column) => (
                <TableCell
                  key={cellData.id + col.dataIndex}
                  align={col.align}
                  width={col.width}
                >
                  {!!cellData[col.dataIndex] ? cellData[col.dataIndex] : " - "}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!loading && data && data.length === 0 && <NoData />}
    </>
  )
}

export default TagsTable
