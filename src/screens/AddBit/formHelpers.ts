import { EditorState } from "draft-js"
import * as yup from "yup"

import { CreateBitForm } from "../../types"

export const initialValues: CreateBitForm = {
  editorState: EditorState.createEmpty(),
  imageCredit: "",
  imageURL: "",
  isPublished: false,
  metaDescription: "",
  metaTitle: "",
  sourceCredit: "",
  sourceURL: "",
  tags: []
}

export const validationSchema = yup.object().shape({
  imageURL: yup.string().url("Please enter a valid URL."),
  sourceURL: yup.string().url("Please enter a valid URL."),
  tags: yup.array().min(1, "At least one tag must be added.")
})
