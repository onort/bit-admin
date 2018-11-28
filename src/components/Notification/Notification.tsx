import React from "react"
import cx from "classnames"

import styles from "./Notification.scss"

export type NotificationTypes = "error" | "default" | "success"

interface Props {
  className?: string
  message: string
  type?: NotificationTypes
}

// TODO: Consider adding an onClose prop and close icon
const Notification: React.SFC<Props> = props => {
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

Notification.defaultProps = {
  type: "default"
}

export default Notification
