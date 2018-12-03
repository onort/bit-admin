import { EditorState } from "draft-js"

import { TagData } from "./"

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
  tags: string[]
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

/*
type Bit {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  author: User @relation(name: "BitAuthor", onDelete: SET_NULL)
  contentHTML: String!
  contentText: String!
  imageCredit: String
  imageURL: String
  isPublished: Boolean! @default(value: "false")
  metaDescription: String
  metaTitle: String
  sourceCredit: String
  sourceURL: String
  tags: [Tag!]! @relation(name: "BitTag", onDelete: SET_NULL)
}
*/
