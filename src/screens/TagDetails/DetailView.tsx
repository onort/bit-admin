import React from "react"
import { MdDelete as DeleteIcon, MdEdit as EditIcon } from "react-icons/md"
import cx from "classnames"

import styles from "./TagDetails.scss"
import { Button, Container, Paper } from "../../components"
import { convertISODate } from "../../utils/format"

interface Tag {
  id: string
  createdAt: string
  updatedAt: string
  metaDescription?: string
  metaTitle?: string
  name: string
}

interface Props {
  tag: Tag
  onEditClick: () => void
}

const DetailView: React.SFC<Props> = props => {
  const {
    id,
    createdAt,
    updatedAt,
    metaDescription,
    metaTitle,
    name
  } = props.tag
  const created = convertISODate(createdAt, "DD.MM.YYYY HH:mm")
  const updated = convertISODate(updatedAt, "DD.MM.YYYY HH:mm")
  const buttonsRow = cx(styles.row, styles.buttons)
  return (
    <>
      <Container className={buttonsRow}>
        <Button
          className={styles.edit}
          icon={<EditIcon />}
          text="Edit Tag"
          onClick={props.onEditClick}
        />
        <Button
          className={styles.delete}
          icon={<DeleteIcon />}
          text="Delete Tag"
          onClick={props.onEditClick}
        />
      </Container>
      <Container className={styles.row}>
        <Paper className={styles.half} elevation={2}>
          <h1 className={styles.name}>
            &#35;
            {name}
          </h1>
          <h4 className={styles.id}>{id}</h4>
        </Paper>
        <Paper className={styles.half} elevation={2}>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Last Update</span>
            <span className={styles.data}>{updated}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Creation Date</span>
            <span className={styles.data}>{created}</span>
          </div>
        </Paper>
      </Container>
      <Container className={styles.row}>
        <Paper className={styles.half} elevation={2}>
          <h2 className={styles.label}>Meta Title</h2>
          <p className={styles.text}>{metaTitle ? metaTitle : "-"}</p>
        </Paper>
        <Paper className={styles.half} elevation={2}>
          <h2 className={styles.label}>Meta Description</h2>
          <p className={styles.text}>
            {metaDescription ? metaDescription : "-"}
          </p>
        </Paper>
      </Container>
    </>
  )
}

export default DetailView
