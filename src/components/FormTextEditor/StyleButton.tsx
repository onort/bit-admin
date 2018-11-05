import React from "react"
import { DraftBlockType, DraftInlineStyleType } from "draft-js"
import cx from "classnames"

import styles from "./FormTextEditor.scss"

interface Props {
  active: boolean
  label: string
  onToggle: (e: any) => void
  style: string
}

const StyleButton: React.SFC<Props> = props => {
  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    props.onToggle(props.style)
  }
  const className = cx(styles.styleButton, {
    [styles.activeButton]: props.active
  })
  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  )
}

export default StyleButton
