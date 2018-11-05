import React, { Component } from "react"
import { withFormik, FormikProps, Form, Field } from "formik"
import { EditorState } from "draft-js"
import { MdArchive as SaveIcon } from "react-icons/md"
import * as yup from "yup"

import styles from "./Add.scss"
import {
  Button,
  Container,
  FormInput,
  FormTagField,
  FormTextEditor,
  Shell
} from "../../components"
import { TagType } from "../../components/FormTagField"

interface FormValues {
  editorState: EditorState
  description: string
  title: string
  tagToAdd: string
  tags: TagType[]
}

const initialValues: FormValues = {
  editorState: EditorState.createEmpty(),
  description: "",
  title: "",
  tagToAdd: "",
  tags: [
    { name: "example", id: "123", count: 0 },
    { name: "other", id: "1234", count: 0 }
  ]
}

class Add extends Component<FormikProps<FormValues>> {
  public handleEditorChange = () => console.log("Editor change.")
  public render() {
    return (
      <Shell>
        <Container narrow={true}>
          <Form>
            <h3 className={styles.formTitle}>Add New Bit</h3>
            <Field
              type="text"
              name="title"
              placeholder="Title"
              label="Title"
              component={FormInput}
            />
            <Field
              type="text"
              name="description"
              placeholder="Description"
              label="Description"
              component={FormInput}
            />
            <Field
              name="editorState"
              label="Content"
              component={FormTextEditor}
            />
            <Field
              type="text"
              name="tagToAdd"
              placeholder=""
              label="Tags"
              tagsarrayname="tags"
              component={FormTagField}
            />
            <Button text="Submit" type="submit" icon={<SaveIcon />} />
          </Form>
        </Container>
      </Shell>
    )
  }
}

const MyForm = withFormik<undefined, FormValues>({
  mapPropsToValues: () => initialValues,
  handleSubmit: (values: FormValues) => {
    console.log("Form submitted", values)
  },
  validationSchema: yup.object().shape({
    title: yup
      .string()
      .min(5)
      .required()
    // editor text content check breaks yup
    // editorState: yup
    //   .object()
    //   .test("Editor should have text", "Content are can't be empty", (value: EditorState) =>
    //     value.getCurrentContent().hasText()
    //   )
  })
})(Add)

export default MyForm
