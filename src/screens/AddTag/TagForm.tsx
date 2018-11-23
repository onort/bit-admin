import React from "react"
import { Field, Form, FormikProps } from "formik"
import { MdLocalOffer as TagIcon, MdArchive as SaveIcon } from "react-icons/md"

import { Button, ErrorMessage, FormInput, FormTitle } from "../../components"
import { Tag } from "./"

interface Props {
  form: FormikProps<Tag>
  error?: any
}

const TagForm: React.SFC<Props> = props => {
  const { form, error } = props
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
        text="Save Tag"
        type="submit"
        success={true}
        disabled={form.isSubmitting}
        icon={<SaveIcon />}
      />
    </Form>
  )
}

export default TagForm
