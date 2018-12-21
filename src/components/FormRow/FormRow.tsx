import React from "react"
import cx from "classnames"

import styles from "./FormRow.scss"

interface Props {
  children: React.ReactNode
  className?: string
}

const FormRow: React.SFC<Props> = props => {
  const className = cx(styles.row, props.className)
  return <div className={className}>{props.children}</div>
}

export default FormRow
