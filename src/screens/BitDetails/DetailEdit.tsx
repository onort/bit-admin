import React from "react"
import { Formik, FormikActions, FormikProps } from "formik"
import { MdPageview as ViewIcon } from "react-icons/md"
import { MutationFn } from "react-apollo"
import cx from "classnames"

import styles from "./BitDetails.scss"
import { Button, Container, Paper } from "../../components"
import { BitForm, validationSchema } from "../AddBit"
import { BitEdit } from "./"

interface Props {
  error?: { message: string }
  initialValues: BitEdit
  mutation: MutationFn<null, any>
  onSubmit: (
    mutation: MutationFn<null, any>
  ) => (values: BitEdit, formikActions: FormikActions<BitEdit>) => Promise<void>
  onToggle: () => void
}

const DetailsEdit: React.SFC<Props> = props => {
  const { error, initialValues, mutation, onToggle, onSubmit } = props
  const buttonsRow = cx(styles.row, styles.buttons)
  return (
    <>
      <Container className={buttonsRow}>
        <Button
          className={styles.view}
          icon={<ViewIcon />}
          text="View Tag"
          onClick={onToggle}
        />
      </Container>
      <Container className={styles.row}>
        <Paper className={styles.full} elevation={2}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit(mutation)}
            render={(form: any) => (
              <BitForm form={form} error={error} buttonText="Update Bit" />
            )}
          />
        </Paper>
      </Container>
    </>
  )
}

export default DetailsEdit
