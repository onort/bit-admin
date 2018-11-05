import React, { Component } from "react"
import { withFormik, FormikProps, Form, Field } from "formik"
import { MdArchive as SaveIcon } from "react-icons/md"
import * as yup from "yup"

import styles from "./Add.scss"
import {
  Button,
  Container,
  FormInput,
  FormTagField,
  Shell
} from "../../components"
import { TagType } from "../../components/FormTagField"

interface FormValues {
  content: string
  summary: string
  longText: string
  tagToAdd: string
  tags: TagType[]
}

const initialValues: FormValues = {
  content: "",
  summary: "",
  longText: "",
  tagToAdd: "",
  tags: [
    { name: "example", id: "123", count: 0 },
    { name: "other", id: "1234", count: 0 }
  ]
}

class Add extends Component<FormikProps<FormValues>> {
  public handleSubmit = () => console.log("Hello")
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
              type="text"
              name="content"
              placeholder="Content"
              label="Content"
              component={FormInput}
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
      .required(),
    content: yup
      .string()
      .min(20)
      .required()
  })
})(Add)

export default MyForm
