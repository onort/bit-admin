import React from "react"
import { MdOpenInNew as LinkIcon } from "react-icons/md"
import cx from "classnames"

import styles from "./DetailCard.scss"

interface Props {
  className?: string
  content: string | undefined
  linked?: boolean
  title?: string
  url?: string
}

const Item: React.SFC<Props> = props => {
  const className = cx(styles.itemContainer, props.className)
  const textContent = props.content ? props.content : "-"
  return (
    <div className={className}>
      {props.title && <span className={styles.itemTitle}>{props.title}</span>}
      <span className={styles.itemContent}>
        {props.linked ? (
          <a className={styles.itemLink} href={props.url} target="_blank">
            {textContent}
            <LinkIcon />
          </a>
        ) : (
          textContent
        )}
      </span>
    </div>
  )
}

Item.defaultProps = {
  linked: false
}

export default Item
