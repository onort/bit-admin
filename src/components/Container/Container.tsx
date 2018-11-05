import React from "react"
import cx from "classnames"

import styles from "./Container.scss"

interface Props {
  className?: string
  narrow?: boolean
}

const Container: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles.narrow]: props.narrow },
    props.className
  )
  return <div className={className}>{props.children}</div>
}

export default Container
