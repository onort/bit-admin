import React, { Component } from "react"
import { FastField, Field, Form, FormikProps } from "formik"
import { MdArchive as SaveIcon } from "react-icons/md"

import styles from "./Add.scss"
import {
  Button,
  Container,
  FormInput,
  FormTagField,
  FormTextEditor,
  FormTitle,
  Paper,
  Shell
} from "../../components"
import formEnhancer, { FormValues } from "./formEnhancer"

export class Add extends Component<FormikProps<FormValues>> {
  public render() {
    return (
      <Shell>
        <Container narrow="narrow">
          <Paper className={styles.paper} elevation={2}>
            <Form>
              <FormTitle title="Add New Bit" />
              <Field
                type="text"
                name="title"
                placeholder="Title"
                label="Title"
                component={FormInput}
              />
              <Field
                type="text"
                name="description"
                placeholder="Description"
                label="Description"
                component={FormInput}
              />
              <FastField
                name="editorState"
                label="Content"
                component={FormTextEditor}
              />
              <Field
                type="text"
                name="tagToAdd"
                placeholder=""
                label="Tags"
                tagsarrayname="tags"
                component={FormTagField}
              />
              <Button
                className={styles.submit}
                text="Submit"
                type="submit"
                success={true}
                icon={<SaveIcon />}
              />
            </Form>
          </Paper>
        </Container>
      </Shell>
    )
  }
}

const AddScreen = formEnhancer(Add)

export default AddScreen
