import React from "react"
import { Field, Form, Formik, FormikProps } from "formik"
import { Mutation } from "react-apollo"
import { MdLocalOffer as TagIcon, MdArchive as SaveIcon } from "react-icons/md"

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

const AddTag: React.SFC = () => {
  return (
    <Shell>
      <Container narrow="narrow">
        <Paper className={styles.paper} elevation={2}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => console.log(values)}
            render={() => (
              <Form>
                <FormTitle title="Add New Tag" icon={<TagIcon />} />
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
                  icon={<SaveIcon />}
                />
              </Form>
            )}
          />
        </Paper>
      </Container>
    </Shell>
  )
}

export default AddTag
