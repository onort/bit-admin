import React from "react"
import { mount, shallow } from "enzyme"
import { Formik, Form, Field } from "formik"

import FormTagField, { Tag } from "../"

// TODO: Mock Apollo
describe("<FormTagField />", () => {
  it.skip("should match snapshot", () => {
    const testValues = { test: "", testArray: [] }
    const fakeSubmit = jest.fn()
    const wrapper = shallow(
      <Formik initialValues={testValues} onSubmit={fakeSubmit}>
        {props => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Field
                name="test"
                tagsarrayname="testArray"
                label="Tag Test"
                component={FormTagField}
              />
            </form>
          )
        }}
      </Formik>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip("should add a tag", () => {
    const testValues = { test: "", testArray: [] }
    const fakeSubmit = jest.fn()
    const wrapper = mount(
      <Formik initialValues={testValues} onSubmit={fakeSubmit}>
        {props => {
          return (
            <Form {...props}>
              <Field
                name="test"
                tagsarrayname="testArray"
                label="Tag Test"
                component={FormTagField}
              />
            </Form>
          )
        }}
      </Formik>
    )
    wrapper
      .find("input.input")
      .simulate("change", { target: { name: "test", value: "testTag" } })
    wrapper.simulate("keyPress", { key: "Enter" })
    expect(wrapper.find(Tag).exists()).toBe(true)
    wrapper.unmount()
  })
})
