import React from "react"
import { FieldProps } from "formik"
import cx from "classnames"

import styles from "./FormTagField.scss"
import { Tag } from "./"
import { ErrorMessage } from "../"
import { Tag as TagType } from "../../types"

// Custom component props are untyped as of formik v1.3.1
interface Props extends FieldProps {
  label?: string
  required?: boolean
  tagsarrayname: string
  tags: TagType[]
}

const FormTagField: React.SFC<Props> = ({
  form,
  field,
  tagsarrayname,
  ...props
}) => {
  const { errors, touched, values, setFieldValue } = form
  const { name, value } = field
  const handleTagAdd: React.KeyboardEventHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      values[tagsarrayname].push({ id: value.trim(), name: value.trim() })
      setFieldValue(tagsarrayname, values[tagsarrayname])
      setFieldValue(name, "")
    }
  }
  const handleRemove = (tagId: string) => {
    const newArr = values[tagsarrayname].filter((t: TagType) => t.id !== tagId)
    setFieldValue(tagsarrayname, newArr)
  }
  const labelClassName = cx(styles.label, { [styles.required]: props.required })
  return (
    <div className={styles.container}>
      {props.label && (
        <label className={labelClassName} htmlFor={name}>
          {props.label}
        </label>
      )}
      <input
        className={styles.input}
        {...field}
        {...props}
        onKeyPress={handleTagAdd}
      />
      {values[tagsarrayname].length > 0 && (
        <div className={styles.tags}>
          {values[tagsarrayname].map((tag: TagType) => (
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
