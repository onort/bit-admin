import React from "react"
import { MdClose as CloseIcon } from "react-icons/md"

import styles from "./FormTagField.scss"
import { TagData } from "../../types"

interface Props {
  tag: TagData
  onRemove: (id: string) => void
}

const Tag: React.SFC<Props> = props => {
  const { id, name } = props.tag
  const handleRemove = () => props.onRemove(id)
  return (
    <div className={styles.tagContainer}>
      <span className={styles.name}>
        &#35;
        {name}
      </span>
      <span className={styles.remove} onClick={handleRemove}>
        <CloseIcon className={styles.removeIcon} />
      </span>
    </div>
  )
}

export default Tag
