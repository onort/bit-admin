import React from "react"
import { FastField, Field, Form, FormikProps } from "formik"
import { MdArchive as SaveIcon } from "react-icons/md"

import styles from "./AddBit.scss"
import {
  Button,
  ErrorMessage,
  FormInput,
  FormRow,
  FormTagField,
  FormTextEditor,
  FormTitle,
  FormToggle
} from "../../components"
import { CreateBitForm } from "../../types"

interface Props {
  buttonText?: string
  error?: any
  form: FormikProps<CreateBitForm>
}

const TagForm: React.SFC<Props> = props => {
  const { buttonText, error, form } = props
  return (
    <Form>
      <FormTitle title="Add Bit" />
      {error && <ErrorMessage message={error.message} />}
      <FastField name="editorState" component={FormTextEditor} />
      <Field
        type="text"
        name="tagToAdd"
        label="Tags"
        tagsarrayname="tags"
        component={FormTagField}
      />
      <Field
        type="text"
        name="metaTitle"
        placeholder="Title"
        label="Meta Title"
        component={FormInput}
      />
      <Field
        type="text"
        name="metaDescription"
        placeholder="Description"
        label="Meta Description"
        component={FormInput}
      />
      <FormRow>
        <Field
          type="text"
          name="imageCredit"
          placeholder="Image Source"
          label="Image Source"
          half={1}
          component={FormInput}
        />
        <Field
          type="text"
          name="imageURL"
          placeholder="Image URL"
          label="Image URL"
          half={1}
          component={FormInput}
        />
      </FormRow>
      <FormRow>
        <Field
          type="text"
          name="sourceCredit"
          placeholder="Source"
          label="Source"
          half={1}
          component={FormInput}
        />
        <Field
          type="text"
          name="sourceURL"
          placeholder="Source URL"
          label="Source URL"
          half={1}
          component={FormInput}
        />
      </FormRow>
      <Field
        type="checkbox"
        name="isPublished"
        label="Published"
        component={FormToggle}
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
  buttonText: "Save Bit"
}

export default TagForm
