import React from "react"
import { Field, Form, Formik, FormikActions, FormikProps } from "formik"
import { Mutation, MutationFn } from "react-apollo"
import { MdLocalOffer as TagIcon, MdArchive as SaveIcon } from "react-icons/md"
import gql from "graphql-tag"

import styles from "./AddTag.scss"
import {
  Button,
  Container,
  FormInput,
  FormTitle,
  Paper,
  Shell
} from "../../components"
import validationSchema from "./validationSchema"

interface Tag {
  metaDescription: string
  metaTitle: string
  name: string
}

const initialValues: Tag = {
  metaDescription: "",
  metaTitle: "",
  name: ""
}

const addTagMuatation = gql`
  mutation addTag(
    $name: String!
    $metaTitle: String
    $metaDescription: String
  ) {
    createTag(
      name: $name
      metaTitle: $metaTitle
      metaDescription: $metaDescription
    ) {
      id
    }
  }
`

// TODO: Form Error and Loading Components
// TODO: Success feedback via Modal
const AddTag: React.SFC = () => {
  const handleSubmit = (mutation: MutationFn<null, Tag>) => async (
    values: Tag,
    { resetForm, setSubmitting }: FormikActions<Tag>
  ) => {
    setSubmitting(true)
    await mutation({
      variables: {
        name: values.name.toLowerCase(),
        metaDescription: values.metaDescription.toLowerCase(),
        metaTitle: values.metaDescription.toLowerCase()
      }
    })
    resetForm()
    setSubmitting(false)
  }

  return (
    <Mutation mutation={addTagMuatation}>
      {(addTag, { loading, error }) => {
        return (
          <Shell>
            <Container narrow="narrow">
              <Paper className={styles.paper} elevation={2}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit(addTag)}
                  render={(form: FormikProps<Tag>) => {
                    if (loading) return <p>Loading...</p>
                    return (
                      <Form method="post">
                        <FormTitle title="Add New Tag" icon={<TagIcon />} />
                        {error && <p>Error: {error.message}</p>}
                        <Field
                          type="text"
                          name="name"
                          placeholder="Tag name"
                          label="Tag Name"
                          component={FormInput}
                        />
                        <Field
                          type="text"
                          name="metaTitle"
                          placeholder="Title"
                          label="Title (Meta)"
                          component={FormInput}
                        />
                        <Field
                          type="text"
                          name="metaDescription"
                          placeholder="Description"
                          label="Description (Meta)"
                          component={FormInput}
                        />
                        <Button
                          text="Save Tag"
                          type="submit"
                          success={true}
                          disabled={form.isSubmitting}
                          icon={<SaveIcon />}
                        />
                      </Form>
                    )
                  }}
                />
              </Paper>
            </Container>
          </Shell>
        )
      }}
    </Mutation>
  )
}

export default AddTag
