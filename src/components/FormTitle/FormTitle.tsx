import React from "react"
import cx from "classnames"

import styles from "./FormTitle.scss"

interface Props {
  className?: string
  icon?: React.ReactNode
  title: string
}

const FormTitle: React.SFC<Props> = props => {
  const className = cx(styles.container, props.className)
  return (
    <div className={className}>
      {props.icon && <span className={styles.icon}>{props.icon}</span>}
      <span className={styles.title}>{props.title}</span>
    </div>
  )
}

export default FormTitle
