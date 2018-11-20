import React from "react"
import { FieldProps } from "formik"

import styles from "./FormTagField.scss"
import { Tag } from "./"
import { ErrorMessage } from "../"

// TODO: Rewamp TagType
export interface TagType {
  name: string
  id?: string
  count?: number
}

// Custom component props are untyped as of formik v1.3.1
interface Props extends FieldProps {
  label?: string
  tagsarrayname: string
  tags: string[]
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
      values[tagsarrayname].push(value)
      setFieldValue(tagsarrayname, values[tagsarrayname])
      setFieldValue(name, "")
    }
  }
  const handleRemove = (tag: string) => {
    const newArr = values[tagsarrayname].filter((t: string) => t !== tag)
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
          {values[tagsarrayname].map((tag: string) => (
            <Tag key={tag} tag={tag} onRemove={handleRemove} />
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

export default FormTagField
