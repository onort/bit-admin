import React from "react"
import { MdDelete as DeleteIcon, MdEdit as EditIcon } from "react-icons/md"
import cx from "classnames"

import styles from "./BitDetails.scss"
import {
  Button,
  Container,
  DetailCard,
  DetailCardContent,
  DetailCardItem,
  DetailCardTitle
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
        <DetailCard width="full">
          <DetailCardTitle content="Bit Content" />
          <DetailCardContent>
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
          </DetailCardContent>
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
      <Container className={styles.row}>
        <DetailCard width="half">
          <DetailCardTitle content="Info" />
          <DetailCardItem content={author.name} title="Author" />
          <DetailCardItem content={created} title="Date Created" />
          <DetailCardItem content={updated} title="Last Updated" />
        </DetailCard>
        <DetailCard width="half">
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
      </Container>
    </>
  )
}

export default DetailView
