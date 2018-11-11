import * as yup from "yup"

export default yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please enter your email address."),
  name: yup.string().required("Please enter your name."),
  password: yup
    .string()
    .min(6, "Your password must be at least 6 characters long.")
    .required("Please enter your password.")
})
