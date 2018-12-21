import React from "react"
import { FieldProps } from "formik"
import cx from "classnames"

import styles from "./FormInput.scss"
import { ErrorMessage } from "../"

// Custom component props are untyped as of formik v1.3.1
// half uses 0 and 1 instead of a boolean
// reason being prop passed through Formik Field component
interface Props extends FieldProps {
  half?: 0 | 1
  label?: string
  required?: boolean
}

const FormInput: React.SFC<Props> = ({ form, field, ...props }) => {
  const { errors, touched } = form
  const { name } = field
  const containerClassName = cx(styles.container, {
    [styles.half]: !!props.half
  })
  const labelClassName = cx(styles.label, { [styles.required]: props.required })
  return (
    <div className={containerClassName}>
      {props.label && (
        <label className={labelClassName} htmlFor={name}>
          {props.label}
        </label>
      )}
      <input className={styles.input} {...field} {...props} />
      {touched[name] &&
        errors[name] && <ErrorMessage small={true} message={errors[name]} />}
    </div>
  )
}

FormInput.defaultProps = {
  half: 0,
  required: false
}

export default FormInput
