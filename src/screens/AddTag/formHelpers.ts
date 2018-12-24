import * as yup from "yup"
import { Tag } from "../../types"

export const initialValues: Tag = {
  metaDescription: "",
  metaTitle: "",
  name: "",
  slug: ""
}

export const validationSchema = yup.object().shape({
  metaDescription: yup
    .string()
    .min(20, "Meta description must be at least 20 characters long.")
    .nullable(true),
  metaTitle: yup.string().nullable(true),
  name: yup.string().required("Please enter a tag name."),
  slug: yup.string().required("Please add a slug for this tag.")
})
