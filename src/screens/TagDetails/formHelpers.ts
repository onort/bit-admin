import { Tag } from "../AddTag"

export interface TagData extends Tag {
  id: string
  createdAt: string
  updatedAt: string
  [key: string]: string
}

export interface TagMutation extends Tag {
  id: string
}
