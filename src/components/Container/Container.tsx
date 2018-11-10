import React from "react"
import cx from "classnames"

import styles from "./Container.scss"

type containerType = "narrow" | "veryNarrow"

interface Props {
  className?: string
  narrow?: containerType
}

const Container: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles[`${props.narrow}`]]: props.narrow },
    props.className
  )
  return <div className={className}>{props.children}</div>
}

export default Container
