import React from "react"
import { Formik, FormikActions, FormikProps } from "formik"
import { MdPageview as ViewIcon } from "react-icons/md"
import { MutationFn } from "react-apollo"
import cx from "classnames"

import styles from "./BitDetails.scss"
import { Button, Container, Paper } from "../../components"
import { BitForm, validationSchema } from "../AddBit"
import { UpdateBitForm, UpdateBitMutation } from "../../types"

interface Props {
  error?: { message: string }
  initialValues: UpdateBitForm
  mutation: MutationFn<null, UpdateBitMutation>
  onSubmit: (
    mutation: MutationFn<null, UpdateBitMutation>
  ) => (
    values: UpdateBitForm,
    formikActions: FormikActions<UpdateBitForm>
  ) => Promise<void>
  onViewClick: () => void
}

const DetailsEdit: React.SFC<Props> = props => {
  const { error, initialValues, mutation, onViewClick, onSubmit } = props
  const buttonsRow = cx(styles.row, styles.buttons)
  return (
    <>
      <Container className={buttonsRow}>
        <Button
          className={styles.view}
          icon={<ViewIcon />}
          text="View Bit"
          onClick={onViewClick}
        />
      </Container>
      <Container className={styles.row}>
        <Paper className={styles.full} elevation={2}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit(mutation)}
            render={(form: FormikProps<UpdateBitForm>) => (
              <BitForm form={form} error={error} buttonText="Update Bit" />
            )}
          />
        </Paper>
      </Container>
    </>
  )
}

export default DetailsEdit
