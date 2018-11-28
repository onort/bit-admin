import React from "react"
import cx from "classnames"

import styles from "./Modal.scss"

interface Props {
  children: React.ReactNode
  className?: string
}

const Modal: React.SFC<Props> = props => {
  const className = cx(styles.container, props.className)
  return <div className={className}>{props.children}</div>
}

export default Modal
