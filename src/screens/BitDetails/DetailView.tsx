import React from "react"
import { MdDelete as DeleteIcon, MdEdit as EditIcon } from "react-icons/md"
import cx from "classnames"

import styles from "./BitDetails.scss"
import {
  Button,
  Container,
  DetailCard,
  DetailCardItem,
  DetailCardTitle,
  Paper
} from "../../components"
import { convertISODate } from "../../utils/format"
import { BitData } from "../../types"

interface Props {
  bit: BitData
  onDeleteClick: () => void
  onEditClick: () => void
}

const DetailView: React.SFC<Props> = props => {
  const {
    author,
    contentHTML,
    createdAt,
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
          text="Edit Bit"
          onClick={props.onEditClick}
        />
        <Button
          className={styles.delete}
          icon={<DeleteIcon />}
          text="Delete Bit"
          onClick={props.onDeleteClick}
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
              <span key={tag.id} className={styles.tag}>
                {tag.name}
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
          <DetailCard>
            <DetailCardTitle content="Info" />
            <DetailCardItem content={author.name} title="Author" />
            <DetailCardItem content={created} title="Date Created" />
            <DetailCardItem content={updated} title="Last Updated" />
          </DetailCard>
        </Paper>
        <Paper className={styles.half} elevation={2}>
          <DetailCard>
            <DetailCardTitle content="Sources" />
            <DetailCardItem
              content={imageCredit}
              title="Image"
              linked={!!imageURL}
              url={imageURL}
            />
            <DetailCardItem
              content={sourceCredit}
              title="Source"
              linked={!!sourceURL}
              url={sourceURL}
            />
          </DetailCard>
        </Paper>
      </Container>
    </>
  )
}

export default DetailView
