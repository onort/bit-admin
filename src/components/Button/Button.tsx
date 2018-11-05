import React from "react"
import cx from "classnames"

import styles from "./Button.scss"

type ButtonHTMLType = "submit" | "button" | "reset"

interface Props {
  className?: string
  icon?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  text?: string
  type?: ButtonHTMLType
}

const Button: React.SFC<Props> = props => {
  const className = cx(styles.button, props.className)
  return (
    <button type={props.type} className={className} onClick={props.onClick}>
      {props.icon && <span className={styles.icon}>{props.icon}</span>}
      <span className={styles.text}>{props.text}</span>
    </button>
  )
}
export default Button
