export interface Tag {
  metaDescription?: string
  metaTitle?: string
  name: string
}

export interface TagData extends Tag {
  createdAt: string
  updatedAt: string
  createdBy?: any
  bits?: any[]
  id: string
  [key: string]: any
}

export interface TagMutation extends Tag {
  id: string
}
