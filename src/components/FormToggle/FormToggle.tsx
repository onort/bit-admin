import React from "react"
import { FieldProps } from "formik"

import styles from "./FormToggle.scss"

interface Props extends FieldProps {
  label: string
}

const FormToggle: React.SFC<Props> = ({ form, field, ...props }) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{props.label}</span>
      <label className={styles.switch}>
        <input {...field} {...props} />
        <span className={styles.slider} />
      </label>
    </div>
  )
}

export default FormToggle
