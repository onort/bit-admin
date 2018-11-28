import { EditorState } from "draft-js"
import * as yup from "yup"

// import { TagType } from "../../components/FormTagField"

// Change to tags: TagType[]
// TagType needs rewamp
export interface Bit {
  imageCredit?: string
  imageURL?: string
  metaDescription?: string
  metaTitle?: string
  sourceCredit?: string
  sourceURL?: string
  tags: string[]
}

export interface CreateBitForm extends Bit {
  editorState: EditorState
  tagToAdd: string
}

export interface CreateBitMutation extends Bit {
  content: string
}

export const initialValues: CreateBitForm = {
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

export const validationSchema = yup.object().shape({
  tags: yup.array().min(1, "At least one tag must be added."),
  tagToAdd: yup.string().min(2, "Tag should be at least 2 characters long.")
})
