import React from "react"
import cx from "classnames"

import styles from "./DetailCard.scss"

interface Props {
  className?: string
  children: React.ReactNode
}

const Content: React.SFC<Props> = props => {
  const className = cx(styles.contentContainer, props.className)
  return <div className={className}>{props.children}</div>
}

export default Content
