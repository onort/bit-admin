import React from "react"
import { FieldProps } from "formik"
import {
  Editor,
  EditorState,
  RichUtils,
  DraftBlockType,
  convertToRaw,
  DraftInlineStyleType
} from "draft-js"
import "draft-js/dist/Draft.css"
import cx from "classnames"

import styles from "./FormTextEditor.scss"
import { BlockStyles, InlineStyles } from "./"

interface Props extends FieldProps {
  className?: string
  label?: string
}

const FormTextEditor: React.SFC<Props> = props => {
  const { field, form } = props

  const handleChange = (editorState: EditorState) => {
    form.setFieldValue(field.name, editorState)
    // console.log("convertToRaw", convertToRaw(editorState.getCurrentContent()))
  }

  const handleBlockTypeToggle = (blockType: DraftBlockType) =>
    handleChange(RichUtils.toggleBlockType(field.value, blockType))

  const handleInlineStyleTypeToggle = (inlineStyle: DraftInlineStyleType) =>
    handleChange(RichUtils.toggleInlineStyle(field.value, inlineStyle))

  const className = cx(styles.container, { [styles.labeled]: props.label })

  return (
    <>
      {props.label && (
        <label className={styles.label} htmlFor={name}>
          {props.label}
        </label>
      )}
      <div className={className}>
        <BlockStyles
          editorState={field.value}
          onToggle={handleBlockTypeToggle}
        />
        <InlineStyles
          editorState={field.value}
          onToggle={handleInlineStyleTypeToggle}
        />
        <div className={styles.editor}>
          <Editor
            editorState={field.value}
            onChange={handleChange}
            placeholder="Add content..."
          />
        </div>
      </div>
    </>
  )
}

export default FormTextEditor
