import { EditorState } from "draft-js"

import { TagData, TagMutation } from "./"

export interface Bit {
  imageCredit?: string
  imageURL?: string
  metaDescription?: string
  metaTitle?: string
  sourceCredit?: string
  sourceURL?: string
}

export interface BitData extends Bit {
  id: string
  createdAt: string
  updatedAt: string
  contentHTML: string
  contentText: string
  isPublished: boolean
  tags: TagData[]
}

export interface CreateBitForm extends Bit {
  editorState: EditorState
  tags: TagMutation[]
  tagToAdd: string
}

export interface CreateBitMutation extends Bit {
  content: string
  tagIds: string[]
}

export interface UpdateBitForm extends CreateBitForm {
  isPublished: boolean
}

export interface UpdateBitMutation extends CreateBitMutation {
  id: string
  isPublished: boolean
}
