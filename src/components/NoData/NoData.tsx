import React from "react"
import cx from "classnames"

import styles from "./NoData.scss"

interface Props {
  className?: string
  message?: string
}

const NoData: React.SFC<Props> = props => {
  const className = cx(styles.container, props.className)
  return (
    <div className={className}>
      <p className={styles.message}>
        {props.message ? props.message : "No data to show."}
      </p>
    </div>
  )
}

export default NoData
