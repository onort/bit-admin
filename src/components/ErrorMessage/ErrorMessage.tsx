import React from "react"
import cx from "classnames"

import styles from "./ErrorMessage.scss"

interface Props {
  className?: string
  message?: string | any // should be a required string, ts compiler not happy with it since i'm using it in FormInput etc.
  small?: boolean
}

const ErrorMessage: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles.small]: props.small },
    props.className
  )
  return (
    <div className={className}>
      <span className={styles.error}>{props.message}</span>
    </div>
  )
}

export default ErrorMessage
