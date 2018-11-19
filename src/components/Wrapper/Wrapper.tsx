import React from "react"
import cx from "classnames"

import styles from "./Wrapper.scss"

interface Props {
  className?: string
}

const Wrapper: React.SFC<Props> = props => (
  <div className={cx(styles.wrapper, props.className)}>{props.children}</div>
)

export default Wrapper
