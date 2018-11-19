import React from "react"
import cx from "classnames"

import styles from "./Loading.scss"

interface Props {
  className?: string
  dotClassName?: string
  fullscreen?: boolean
}

const Loading: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles.fullscreen]: props.fullscreen },
    props.className
  )
  return (
    <div className={className}>
      <div className={cx(styles.dot1, props.dotClassName)} />
      <div className={cx(styles.dot2, props.dotClassName)} />
      <div className={cx(styles.dot3, props.dotClassName)} />
    </div>
  )
}

Loading.defaultProps = {
  fullscreen: false
}

export default Loading
