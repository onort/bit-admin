import React from "react"
import { mount, shallow } from "enzyme"
import { Formik, Form, Field } from "formik"
import { EditorState, Editor } from "draft-js"

import FormTextEditor, { BlockStyles, InlineStyles } from "../"

describe("<FormTextEditor />", () => {
  // random generated keys breaks snapshot tests
  it.skip("should match snapshot", () => {
    jest.mock("draft-js/lib/generateRandomKey.js", () => () => "123")
    const testValues = { testEditorState: EditorState.createEmpty() }
    const fakeSubmit = jest.fn()
    const wrapper = shallow(
      <Formik initialValues={testValues} onSubmit={fakeSubmit}>
        {props => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Field
                name="testEditorState"
                label="Test Text Editor"
                component={FormTextEditor}
              />
            </form>
          )
        }}
      </Formik>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render editor", () => {
    const testValues = { testEditorState: EditorState.createEmpty() }
    const fakeSubmit = jest.fn()
    const wrapper = mount(
      <Formik initialValues={testValues} onSubmit={fakeSubmit}>
        {props => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Field
                name="testEditorState"
                label="Test Text Editor"
                component={FormTextEditor}
              />
            </form>
          )
        }}
      </Formik>
    )
    expect(wrapper.find(Editor).exists()).toBe(true)
    wrapper.unmount()
  })

  it("should have blockstyle controls", () => {
    const testValues = { testEditorState: EditorState.createEmpty() }
    const fakeSubmit = jest.fn()
    const wrapper = mount(
      <Formik initialValues={testValues} onSubmit={fakeSubmit}>
        {props => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Field
                name="testEditorState"
                label="Test Text Editor"
                component={FormTextEditor}
              />
            </form>
          )
        }}
      </Formik>
    )
    expect(wrapper.find(BlockStyles).exists()).toBe(true)
    wrapper.unmount()
  })

  it("should have inlinestyle controls", () => {
    const testValues = { testEditorState: EditorState.createEmpty() }
    const fakeSubmit = jest.fn()
    const wrapper = mount(
      <Formik initialValues={testValues} onSubmit={fakeSubmit}>
        {props => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Field
                name="testEditorState"
                label="Test Text Editor"
                component={FormTextEditor}
              />
            </form>
          )
        }}
      </Formik>
    )
    expect(wrapper.find(InlineStyles).exists()).toBe(true)
    wrapper.unmount()
  })
})
