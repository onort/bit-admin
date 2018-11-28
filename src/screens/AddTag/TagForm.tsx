import React from "react"
import { Field, Form, FormikProps } from "formik"
import { MdLocalOffer as TagIcon, MdArchive as SaveIcon } from "react-icons/md"

import styles from "./AddTag.scss"
import { Button, ErrorMessage, FormInput, FormTitle } from "../../components"
import { Tag } from "./"

interface Props {
  buttonText?: string
  error?: { message: string }
  form: FormikProps<Tag>
}

const TagForm: React.SFC<Props> = props => {
  const { buttonText, error, form } = props
  return (
    <Form method="post">
      <FormTitle title="Add New Tag" icon={<TagIcon />} />
      {error && <ErrorMessage message={error.message} />}
      <Field
        type="text"
        name="name"
        placeholder="Tag name"
        label="Tag Name"
        required={true}
        component={FormInput}
      />
      <Field
        type="text"
        name="metaTitle"
        placeholder="Title"
        label="Title (Meta)"
        component={FormInput}
      />
      <Field
        type="text"
        name="metaDescription"
        placeholder="Description"
        label="Description (Meta)"
        component={FormInput}
      />
      <Button
        className={styles.submit}
        text={buttonText}
        type="submit"
        disabled={form.isSubmitting}
        icon={<SaveIcon />}
      />
    </Form>
  )
}

TagForm.defaultProps = {
  buttonText: "Save Tag"
}

export default TagForm
