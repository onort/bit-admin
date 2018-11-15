import * as yup from "yup"

export default yup.object().shape({
  metaDescription: yup
    .string()
    .min(20, "Meta description must be at least 20 characters long."),
  metaTitle: yup
    .string()
    .min(10, "Meta title must be at least 10 characters long."),
  name: yup.string().required("Please enter a tag name.")
})
