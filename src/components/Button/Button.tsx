import React from "react"
import cx from "classnames"

import styles from "./Button.scss"

type ButtonHTMLType = "submit" | "button" | "reset"

interface Props {
  className?: string
  danger?: boolean
  icon?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  success?: boolean
  text?: string
  type?: ButtonHTMLType
}

const Button: React.SFC<Props> = props => {
  const { danger, icon, onClick, success, text, type } = props
  const className = cx(
    styles.button,
    {
      [styles.success]: success,
      [styles.danger]: danger
    },
    props.className
  )
  return (
    <button type={type} className={className} onClick={onClick}>
      {props.icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
    </button>
  )
}
export default Button
