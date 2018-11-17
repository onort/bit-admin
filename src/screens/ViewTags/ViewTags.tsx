import React, { Component } from "react"

import styles from "./ViewTags.scss"
import {
  Container,
  Shell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "../../components"

class ViewTags extends Component {
  public render() {
    return (
      <Shell>
        <Container>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell key="type1" dataIndex="type1">
                  Header 1
                </TableCell>
                <TableCell key="type1" dataIndex="type2">
                  Header 2
                </TableCell>
                <TableCell key="type1" dataIndex="type3">
                  Header 3
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell key="id1" dataIndex="type1">
                  Cell 1
                </TableCell>
                <TableCell key="id2" dataIndex="type2">
                  Cell 2
                </TableCell>
                <TableCell key="id3" dataIndex="type3">
                  Cell 3
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Container>
      </Shell>
    )
  }
}

export default ViewTags
