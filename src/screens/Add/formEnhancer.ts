import { withFormik } from "formik"
import { EditorState } from "draft-js"
import * as yup from "yup"

import { TagType } from "../../components/FormTagField"

export interface FormValues {
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
  tags: []
}

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Title must be at least 5 characters long.")
    .required("Title can't be empty."),
  tags: yup.array().min(1, "At least one tag must be added."),
  tagToAdd: yup.string().min(2, "Tag should be at least 2 characters long.")
})

const formEnhancer = withFormik<undefined, FormValues>({
  mapPropsToValues: () => initialValues,
  handleSubmit: (values: FormValues) => console.log("Form submitted.", values),
  validationSchema
})

export default formEnhancer
