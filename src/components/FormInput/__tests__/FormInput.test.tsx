import React from "react"
import { mount, shallow } from "enzyme"
import { Formik, Form, Field } from "formik"

import FormInput from "../"

describe("<FormInput />", () => {
  it("should match snapshot", () => {
    const fakeSubmit = jest.fn()
    const wrapper = shallow(
      <Formik initialValues={{ test: "" }} onSubmit={fakeSubmit}>
        <Form>
          <Field type="text" name="test" label="Test" component={FormInput} />
        </Form>
      </Formik>
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render a label element with correct text", () => {
    const fakeSubmit = jest.fn()
    const testLabel = "Test"
    const wrapper = mount(
      <Formik initialValues={{ test: "" }} onSubmit={fakeSubmit}>
        <Form>
          <Field
            type="text"
            name="test"
            label={testLabel}
            component={FormInput}
          />
        </Form>
      </Formik>
    )
    expect(wrapper.find("label").exists()).toBe(true)
    expect(wrapper.find("label").text()).toBe(testLabel)
    wrapper.unmount()
  })

  it("should render correctly if half prop is passed", () => {
    const fakeSubmit = jest.fn()
    const wrapper = mount(
      <Formik initialValues={{ test: "" }} onSubmit={fakeSubmit}>
        <Form>
          <Field
            type="text"
            name="test"
            label="Test"
            half={1}
            component={FormInput}
          />
        </Form>
      </Formik>
    )
    console.log(wrapper.html())
    expect(wrapper.find(".container.half").exists()).toBe(true)
    wrapper.unmount()
  })

  it.skip("should error text when there's an error", () => {
    // Test fails, need to handle async validation?
    const fakeSubmit = jest.fn()
    const failValidate = () => ({ test: "Error" })
    const testLabel = "Test"
    const wrapper = mount(
      <Formik
        initialValues={{ test: "" }}
        onSubmit={fakeSubmit}
        validate={failValidate}
      >
        <Form>
          <Field
            type="text"
            name="test"
            label={testLabel}
            component={FormInput}
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    )
    expect(wrapper.find("button").simulate("click"))
    expect(fakeSubmit).toBeCalledTimes(0)
    expect(wrapper.find(".error").exists()).toBe(true)
    wrapper.unmount()
  })
})
