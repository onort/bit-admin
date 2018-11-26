import React from "react"
import { Formik, FormikActions, FormikProps } from "formik"
import { MdPageview as ViewIcon } from "react-icons/md"
import { MutationFn } from "react-apollo"
import cx from "classnames"

import styles from "./TagDetails.scss"
import { Button, Container, Paper } from "../../components"
import { Tag, TagForm, validationSchema } from "../AddTag"
import { MutationVars } from "./TagDetails"

interface Props {
  error?: { message: string }
  initialValues: Tag
  mutation: MutationFn<null, MutationVars>
  onSubmit: (
    mutation: MutationFn<null, MutationVars>
  ) => (values: Tag, formikActions: FormikActions<Tag>) => Promise<void>
  onToggle: () => void
}

const DetailEdit: React.SFC<Props> = props => {
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
            render={(form: FormikProps<Tag>) => (
              <TagForm form={form} error={error} buttonText="Update Tag" />
            )}
          />
        </Paper>
      </Container>
    </>
  )
}

export default DetailEdit
