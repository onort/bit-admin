import { Bit, CreateBitForm, CreateBitMutation } from "../AddBit/formHelpers"

export interface BitData extends Bit {
  id: string
  createdAt: string
  updatedAt: string
  contentHTML: string
  contentText: string
  isPublished: boolean
  tags: any[]
}

export interface UpdateBitForm extends CreateBitForm {
  isPublished: boolean
}

export interface UpdateBitMutation extends CreateBitMutation {
  id: string
  isPublished: boolean
}
