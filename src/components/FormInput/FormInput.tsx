import React from "react"
import { FieldProps } from "formik"
import cx from "classnames"

import styles from "./FormInput.scss"
import { ErrorMessage } from "../"

// Custom component props are untyped as of formik v1.3.1
interface Props extends FieldProps {
  label?: string
  required?: boolean
}

const FormInput: React.SFC<Props> = ({ form, field, ...props }) => {
  const { errors, touched } = form
  const { name } = field
  const labelClassName = cx(styles.label, { [styles.required]: props.required })
  return (
    <div className={styles.container}>
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
  required: false
}

export default FormInput
