import React from "react"
import {
  MdDelete as DeleteIcon,
  MdEdit as EditIcon,
  MdOpenInNew as LinkIcon
} from "react-icons/md"
import cx from "classnames"

import styles from "./BitDetails.scss"
import { Button, Container, Paper } from "../../components"
import { BitData } from "./"
import { convertISODate } from "../../utils/format"

interface Props {
  bit: BitData
  onEditClick: () => void
}

const DetailView: React.SFC<Props> = props => {
  const {
    contentHTML,
    createdAt,
    id,
    imageCredit,
    imageURL,
    metaDescription,
    metaTitle,
    sourceCredit,
    sourceURL,
    tags,
    updatedAt
  } = props.bit
  const buttonsRow = cx(styles.row, styles.buttons)
  const created = convertISODate(createdAt, "DD.MM.YYYY HH:mm")
  const updated = convertISODate(updatedAt, "DD.MM.YYYY HH:mm")
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
        <Paper className={styles.full} elevation={2}>
          <h2 className={styles.label}>Bit content</h2>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: contentHTML }}
          />
          <div className={styles.tagsContainer}>
            {tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
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
      <Container className={styles.row}>
        <Paper className={styles.half} elevation={2}>
          <h2 className={styles.label}>Info</h2>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Id</span>
            <span className={styles.data}>{id}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Last Update</span>
            <span className={styles.data}>{updated}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Creation Date</span>
            <span className={styles.data}>{created}</span>
          </div>
        </Paper>
        <Paper className={styles.half} elevation={2}>
          <h2 className={styles.label}>Sources</h2>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Image</span>
            <span className={styles.data}>
              {imageCredit ? imageCredit : "-"}
              {imageURL && (
                <a className={styles.dataLink} href={imageURL} target="_blank">
                  <LinkIcon />
                </a>
              )}
            </span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Source</span>
            <span className={styles.data}>
              {sourceCredit ? sourceCredit : "-"}
              {sourceURL && (
                <a className={styles.dataLink} href={sourceURL} target="_blank">
                  <LinkIcon />
                </a>
              )}
            </span>
          </div>
        </Paper>
      </Container>
    </>
  )
}

export default DetailView
