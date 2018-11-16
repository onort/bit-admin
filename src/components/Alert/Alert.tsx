import React from "react"
import cx from "classnames"

import styles from "./Alert.scss"

export type AlertTypes = "error" | "default" | "success"

interface Props {
  className?: string
  message: string
  type?: AlertTypes
}

// TODO: Consider adding an onClose prop and close icon
const Alert: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles[`${props.type}`]]: props.type },
    props.className
  )
  return (
    <div className={className}>
      <span className={styles.message}>{props.message}</span>
    </div>
  )
}

Alert.defaultProps = {
  type: "default"
}

export default Alert
