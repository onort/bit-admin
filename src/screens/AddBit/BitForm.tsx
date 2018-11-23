import React from "react"
import { FastField, Field, Form, FormikProps } from "formik"
import { MdArchive as SaveIcon } from "react-icons/md"

import styles from "./AddBit.scss"
import {
  Button,
  ErrorMessage,
  FormInput,
  FormTagField,
  FormTextEditor,
  FormTitle
} from "../../components"
import { Bit } from "./"

interface Props {
  form: FormikProps<Bit>
  error?: any
}

const TagForm: React.SFC<Props> = props => {
  const { form, error } = props
  return (
    <Form>
      <FormTitle title="Add New Bit" />
      {error && <ErrorMessage message={error.message} />}
      <FastField name="editorState" component={FormTextEditor} />
      <Field
        type="text"
        name="tagToAdd"
        placeholder=""
        label="Tags"
        tagsarrayname="tags"
        component={FormTagField}
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
      <Field
        type="text"
        name="imageURL"
        placeholder="Image URL"
        label="Image URL"
        component={FormInput}
      />
      <Field
        type="text"
        name="imageCredit"
        placeholder="Image Source"
        label="Image Source"
        component={FormInput}
      />
      <Field
        type="text"
        name="sourceCredit"
        placeholder="Source"
        label="Source"
        component={FormInput}
      />
      <Field
        type="text"
        name="sourceURL"
        placeholder="Source URL"
        label="Source URL"
        component={FormInput}
      />
      <Button
        className={styles.submit}
        text="Submit"
        type="submit"
        success={true}
        disabled={form.isSubmitting}
        icon={<SaveIcon />}
      />
    </Form>
  )
}

export default TagForm
