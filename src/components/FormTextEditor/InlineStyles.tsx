import React from "react"
import { EditorState, DraftInlineStyleType } from "draft-js"

import styles from "./FormTextEditor.scss"
import { StyleButton } from "./"

interface Props {
  editorState: EditorState
  onToggle: (inlineStyle: DraftInlineStyleType) => void
}

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
]

const BlockStyleControls: React.SFC<Props> = props => {
  const { editorState, onToggle } = props
  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <div className={styles.controlRow}>
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

export default BlockStyleControls
