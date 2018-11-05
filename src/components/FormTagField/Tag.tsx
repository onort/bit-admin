import React from "react"
import { MdClose as CloseIcon } from "react-icons/md"

import styles from "./FormTagField.scss"
import { TagType } from "./"

interface Props {
  tag: TagType
  onRemove: (a: any) => void
}

const Tag: React.SFC<Props> = props => {
  const handleRemove = () => props.onRemove(props.tag)
  return (
    <div className={styles.tagContainer}>
      <span className={styles.name}>{props.tag.name}</span>
      <span className={styles.remove} onClick={handleRemove}>
        <CloseIcon className={styles.removeIcon} />
      </span>
    </div>
  )
}

export default Tag
