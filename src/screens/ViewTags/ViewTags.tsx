import React, { Component } from "react"

import styles from "./ViewTags.scss"
import { Container, Shell, Table } from "../../components"
import mockData from "./mockData" // REMOVE

const columns = [
  { dataIndex: "name", title: "Name" },
  { dataIndex: "metaTitle", title: "Title(Meta)" },
  { dataIndex: "metaDescription", title: "Description(Meta)" }
]

class ViewTags extends Component {
  public render() {
    return (
      <Shell>
        <Container>
          <Table data={mockData.tags} columns={columns} />
        </Container>
      </Shell>
    )
  }
}

export default ViewTags
