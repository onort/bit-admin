import React from "react"
import {
  MdClose as NotPublished,
  MdPublic as Public,
  MdCheck as Published
} from "react-icons/md"

import styles from "./ViewBits.scss"
import {
  NoData,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "../../components"
import { BitData, TagData } from "../../types"

interface Props {
  data: BitData[]
  loading?: boolean
  onRowClick: (id: string) => void
}

const BitsTable: React.SFC<Props> = props => {
  const { data, loading } = props

  const handleRowClick = (id: string) => props.onRowClick(id)

  const createTagsString = (tagsData: TagData[]): string =>
    tagsData.map(tag => tag.name).join(", ")

  return (
    <>
      <Table loading={loading}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.icon} width={1}>
              <Public />
            </TableCell>
            <TableCell width={7}>Content</TableCell>
            <TableCell width={3}>Tags</TableCell>
            <TableCell width={2}>Created</TableCell>
            <TableCell width={2}>Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((bit: BitData) => (
            <TableRow key={bit.id} onClick={() => handleRowClick(bit.id)}>
              <TableCell className={styles.icon} width={1}>
                {bit.isPublished ? (
                  <span className={styles.published} />
                ) : (
                  <span className={styles.notPublished} />
                )}
              </TableCell>
              <TableCell width={7}>{bit.contentText}</TableCell>
              <TableCell width={3}>{createTagsString(bit.tags)}</TableCell>
              <TableCell width={2}>{bit.createdAt}</TableCell>
              <TableCell width={2}>{bit.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!loading && data && data.length === 0 && <NoData />}
    </>
  )
}

export default BitsTable
