import React from "react"
import cx from "classnames"

import styles from "./DetailCard.scss"
import { Paper } from "../"

interface Props {
  children: React.ReactNode
  className?: string
  width?: "full" | "half"
}

const DetailCard: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles.half]: props.width === "half" },
    props.className
  )
  return (
    <Paper className={className} elevation={2}>
      {props.children}
    </Paper>
  )
}

DetailCard.defaultProps = {
  width: "full"
}

export default DetailCard
