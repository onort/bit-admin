import React from "react"
import { mount, shallow } from "enzyme"
import { Formik, Form, Field } from "formik"

import FormToggle from "../"

describe("<FormToggle />", () => {
  it("should match snapshot", () => {
    const fakeSubmit = jest.fn()
    const wrapper = shallow(
      <Formik initialValues={{ test: false }} onSubmit={fakeSubmit}>
        <Form>
          <Field
            type="checkbox"
            name="test"
            label="Test"
            component={FormToggle}
          />
        </Form>
      </Formik>
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render a span element as label with correct text", () => {
    const fakeSubmit = jest.fn()
    const testLabel = "Test"
    const wrapper = mount(
      <Formik initialValues={{ test: false }} onSubmit={fakeSubmit}>
        <Form>
          <Field
            type="checkbox"
            name="test"
            label={testLabel}
            component={FormToggle}
          />
        </Form>
      </Formik>
    )
    expect(wrapper.find(".label").exists()).toBe(true)
    expect(wrapper.find(".label").text()).toBe(testLabel)
    wrapper.unmount()
  })

  // TODO: Check formValue change
  it.skip("should toggle when clicked", () => {
    const fakeSubmit = jest.fn()
    const testLabel = "Test"
    const wrapper = mount(
      <Formik initialValues={{ test: false }} onSubmit={fakeSubmit}>
        <Form>
          <Field
            type="checkbox"
            name="test"
            label={testLabel}
            component={FormToggle}
          />
        </Form>
      </Formik>
    )
    wrapper.find("input").simulate("click")
    expect(wrapper.find("input:checked").exists()).toBe(true)
    wrapper.unmount()
  })
})
