import React from "react"
import { FieldProps } from "formik"
import cx from "classnames"

import styles from "./FormTagField.scss"
import { AutoComplete, Tag } from "./"
import { ErrorMessage } from "../"
import { TagData } from "../../types"

// Custom component props are untyped as of formik v1.3.1
interface Props extends FieldProps {
  label?: string
  required?: boolean
  tagsarrayname: string
  tags: TagData[]
}

const FormTagField: React.SFC<Props> = ({
  form,
  field,
  tagsarrayname,
  ...props
}) => {
  const { errors, touched, values, setFieldValue } = form
  const { name } = field

  const handleRemove = (tagId: string) => {
    const newArr = values[tagsarrayname].filter((t: TagData) => t.id !== tagId)
    setFieldValue(tagsarrayname, newArr)
  }

  const handleSelect = (suggestion: TagData) => {
    const exists = values[tagsarrayname].find(
      (item: TagData) => item.id === suggestion.id
    )
    if (exists) return
    values[tagsarrayname].push(suggestion)
    setFieldValue(tagsarrayname, values[tagsarrayname])
  }

  const labelClassName = cx(styles.label, { [styles.required]: props.required })

  return (
    <div className={styles.container}>
      {props.label && (
        <label className={labelClassName} htmlFor={name}>
          {props.label}
        </label>
      )}
      <AutoComplete onSelect={handleSelect} />
      {values[tagsarrayname].length > 0 && (
        <div className={styles.tags}>
          {values[tagsarrayname].map((tag: TagData) => (
            <Tag key={tag.id} tag={tag} onRemove={handleRemove} />
          ))}
        </div>
      )}
      {touched[name] &&
        !!errors[name] && <ErrorMessage small={true} message={errors[name]} />}
      {touched[name] &&
        !!errors[tagsarrayname] && (
          <ErrorMessage small={true} message={errors[tagsarrayname]} />
        )}
    </div>
  )
}

FormTagField.defaultProps = {
  required: false
}

export default FormTagField
