import React from "react"
import { MdEdit as EditIcon } from "react-icons/md"

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
  return (
    <>
      <Container className={styles.row}>
        <Button
          className={styles.edit}
          icon={<EditIcon />}
          text="Edit Tag"
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
          <div className={styles.dateRow}>
            <span className={styles.dateLabel}>Last Update</span>
            <span className={styles.date}>{updated}</span>
          </div>
          <div className={styles.dateRow}>
            <span className={styles.dateLabel}>Creation Date</span>
            <span className={styles.date}>{created}</span>
          </div>
        </Paper>
      </Container>
      <Container className={styles.row}>
        <Paper className={styles.half} elevation={2}>
          <h1 className={styles.label}>Meta Title</h1>
          <h4 className={styles.text}>{metaTitle ? metaTitle : "-"}</h4>
        </Paper>
        <Paper className={styles.half} elevation={2}>
          <h1 className={styles.label}>Meta Description</h1>
          <h4 className={styles.text}>
            {metaDescription ? metaDescription : "-"}
          </h4>
        </Paper>
      </Container>
    </>
  )
}

export default DetailView
