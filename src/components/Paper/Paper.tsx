import React from "react"
import cx from "classnames"

import styles from "./Paper.scss"

type elevationType = 1 | 2 | 3 | 4

interface Props {
  className?: string
  elevation: elevationType
}

const Paper: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles[`elevation${props.elevation}`]]: props.elevation },
    props.className
  )
  return <div className={className}>{props.children}</div>
}

export default Paper
