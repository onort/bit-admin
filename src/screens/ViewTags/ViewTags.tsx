import React, { Component } from "react"

import styles from "./ViewTags.scss"
import { Container, Paper, Shell, Table } from "../../components"
import { ColumnType } from "../../components/Table"
import { format } from "../../utils"
import mockData from "./mockData" // REMOVE

const columns: ColumnType[] = [
  { dataIndex: "name", title: "Name", width: 4 },
  { dataIndex: "metaTitle", title: "Title(Meta)", width: 4 },
  { dataIndex: "metaDescription", title: "Description(Meta)", width: 4 },
  { dataIndex: "createdAt", title: "Created", width: 2, align: "center" },
  { dataIndex: "updatedAt", title: "Last Update", width: 2, align: "center" }
]

class ViewTags extends Component {
  public render() {
    const data = format.convertISODateFromData(mockData.tags)
    return (
      <Shell>
        <Container>
          <Paper className={styles.paper} elevation={2}>
            <Table data={data} columns={columns} />
          </Paper>
        </Container>
      </Shell>
    )
  }
}

export default ViewTags
