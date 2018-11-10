import { withFormik } from "formik"
import * as yup from "yup"

export interface FormValues {
  email: string
  name: string
  password: string
}

const initialValues: FormValues = {
  email: "",
  name: "",
  password: ""
}

const validationSchema = yup.object().shape({
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

const handleSubmit = (values: FormValues) => {
  console.log("Values: ", values)
}

const formEnhancer = withFormik<undefined, FormValues>({
  mapPropsToValues: () => initialValues,
  handleSubmit,
  validationSchema
})

export default formEnhancer
