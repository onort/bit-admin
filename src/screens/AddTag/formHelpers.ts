import * as yup from "yup"

export interface Tag {
  metaDescription: string
  metaTitle: string
  name: string
}

export const initialValues: Tag = {
  metaDescription: "",
  metaTitle: "",
  name: ""
}

export const validationSchema = yup.object().shape({
  metaDescription: yup
    .string()
    .min(20, "Meta description must be at least 20 characters long."),
  metaTitle: yup
    .string()
    .min(10, "Meta title must be at least 10 characters long."),
  name: yup.string().required("Please enter a tag name.")
})
