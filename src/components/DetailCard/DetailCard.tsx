import React from "react"
import cx from "classnames"

import styles from "./DetailCard.scss"

interface Props {
  children: React.ReactNode
  className?: string
}

const DetailCard: React.SFC<Props> = props => {
  const className = cx(styles.container, props.className)
  return <div className={className}>{props.children}</div>
}

export default DetailCard
