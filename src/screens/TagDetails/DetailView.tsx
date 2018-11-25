import React from "react"
import { MdEdit as EditIcon } from "react-icons/md"

import styles from "./TagDetails.scss"
import { Button, Container, Paper } from "../../components"

// TODO: Props interface
// TODO: Display tag data

const DetailView: React.SFC = props => {
  return (
    <>
      <Container className={styles.row}>
        <Button className={styles.edit} icon={<EditIcon />} text="Edit" />
      </Container>
      <Container className={styles.row}>
        <Paper className={styles.half} elevation={2}>
          <h1 className={styles.name}>#TagName</h1>
          <h4 className={styles.id}>tagid83qwepoiz</h4>
        </Paper>
        <Paper className={styles.half} elevation={2}>
          <div className={styles.dateRow}>
            <span className={styles.dateLabel}>Creation Date</span>
            <span className={styles.date}>21.11.2018 23:00</span>
          </div>
          <div className={styles.dateRow}>
            <span className={styles.dateLabel}>Last Update</span>
            <span className={styles.date}>21.11.2018 23:00</span>
          </div>
        </Paper>
      </Container>
      <Container className={styles.row}>
        <Paper className={styles.half} elevation={2}>
          <h1 className={styles.label}>Meta Title</h1>
          <h4 className={styles.text}>Tag meta title</h4>
        </Paper>
        <Paper className={styles.half} elevation={2}>
          <h1 className={styles.label}>Meta Description</h1>
          <h4 className={styles.text}>
            Tag meta description will be here. Around 120 characters.
          </h4>
        </Paper>
      </Container>
    </>
  )
}

export default DetailView
