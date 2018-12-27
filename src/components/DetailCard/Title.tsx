import React from "react"
import cx from "classnames"

import styles from "./DetailCard.scss"

interface Props {
  className?: string
  content: string
}

const Title: React.SFC<Props> = props => {
  const className = cx(styles.title, props.className)
  return <h2 className={className}>{props.content}</h2>
}

export default Title
