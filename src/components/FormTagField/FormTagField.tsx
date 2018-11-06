import React from "react"
import { FieldProps } from "formik"

import styles from "./FormTagField.scss"
import { Tag } from "./"

export interface TagType {
  name: string
  id?: string
  count?: number
}

// Custom component props are untyped as of formik v1.3.1
interface Props extends FieldProps {
  label?: string
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
      values[tagsarrayname].push({ name: value })
      setFieldValue(tagsarrayname, values[tagsarrayname])
      setFieldValue(name, "")
    }
  }
  const handleRemove = (tag: TagType) => {
    const newArr = values[tagsarrayname].filter(
      (t: TagType) => t.name !== tag.name
    )
    setFieldValue(tagsarrayname, newArr)
  }
  return (
    <div className={styles.container}>
      {props.label && (
        <label className={styles.label} htmlFor={name}>
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
            <Tag key={tag.name} tag={tag} onRemove={handleRemove} />
          ))}
        </div>
      )}
      {touched[name] &&
        !!errors[name] && (
          <span className={styles.error}>Error: {errors[name]}</span>
        )}
      {!!errors[tagsarrayname] && (
        <span className={styles.error}>Error: {errors[tagsarrayname]}</span>
      )}
    </div>
  )
}

export default FormTagField
