import React from "react"
import { MdDelete as DeleteIcon, MdEdit as EditIcon } from "react-icons/md"
import cx from "classnames"

import styles from "./TagDetails.scss"
import { convertISODate } from "../../utils/format"
import {
  Button,
  Container,
  DetailCard,
  DetailCardContent,
  DetailCardItem,
  DetailCardTitle
} from "../../components"
import { TagData } from "../../types"

interface Props {
  tag: TagData
  onDeleteClick: () => void
  onEditClick: () => void
}

const DetailView: React.SFC<Props> = props => {
  const {
    createdAt,
    updatedAt,
    createdBy,
    metaDescription,
    metaTitle,
    name,
    slug
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
          onClick={props.onDeleteClick}
        />
      </Container>
      <Container className={styles.row}>
        <DetailCard width="half">
          <DetailCardContent>
            <h1 className={styles.name}>
              &#35;
              {name}
            </h1>
          </DetailCardContent>
        </DetailCard>
        <DetailCard width="half">
          <DetailCardTitle content="Info" />
          <DetailCardItem content={`/${slug}`} title="Slug" />
          <DetailCardItem content={createdBy.name} title="Author" />
          <DetailCardItem content={created} title="Date Created" />
          <DetailCardItem content={updated} title="Last Updated" />
        </DetailCard>
      </Container>
      <Container className={styles.row}>
        <DetailCard width="half">
          <DetailCardTitle content="Meta Title" />
          <DetailCardItem content={metaTitle} />
        </DetailCard>
        <DetailCard width="half">
          <DetailCardTitle content="Meta Description" />
          <DetailCardItem content={metaDescription} />
        </DetailCard>
      </Container>
    </>
  )
}

export default DetailView
