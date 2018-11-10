import { withFormik } from "formik"
import * as yup from "yup"

export interface FormValues {
  email: string
  password: string
}

const initialValues: FormValues = {
  email: "",
  password: ""
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .required()
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
