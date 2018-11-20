import { EditorState, convertToRaw } from "draft-js"
import * as yup from "yup"

// import { TagType } from "../../components/FormTagField"

// Change to tags: TagType[]
// TagType needs rewamp
export interface Bit {
  editorState: EditorState
  imageCredit?: string
  imageURL?: string
  metaDescription?: string
  metaTitle?: string
  sourceCredit?: string
  sourceURL?: string
  tagToAdd: string
  tags: string[]
}

export const initialValues: Bit = {
  editorState: EditorState.createEmpty(),
  imageCredit: "",
  imageURL: "",
  metaDescription: "",
  metaTitle: "",
  sourceCredit: "",
  sourceURL: "",
  tagToAdd: "",
  tags: []
}

export const editorStateToString = (editorState: EditorState): string => {
  const rawContent = convertToRaw(editorState.getCurrentContent())
  return JSON.stringify(rawContent)
}

export const validationSchema = yup.object().shape({
  tags: yup.array().min(1, "At least one tag must be added."),
  tagToAdd: yup.string().min(2, "Tag should be at least 2 characters long.")
})
