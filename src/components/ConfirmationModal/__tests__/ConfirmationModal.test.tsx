import React from "react"
import { shallow } from "enzyme"

import ConfirmationModal from "../"

const fakeCancel = jest.fn()
const fakeClose = jest.fn()
const fakeConfirm = jest.fn()
const testText = "Test text."

describe("<ConfirmationModal />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <ConfirmationModal
        text={testText}
        onCancel={fakeCancel}
        onConfirm={fakeConfirm}
      />
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have text rendered", () => {
    const wrapper = shallow(
      <ConfirmationModal
        text={testText}
        onCancel={fakeCancel}
        onConfirm={fakeConfirm}
      />
    )
    expect(wrapper.find(".text").text()).toBe(testText)
  })

  it("should render correctly if a cancelText prop is passed", () => {
    const wrapper = shallow(
      <ConfirmationModal
        cancelText={testText}
        text={testText}
        onCancel={fakeCancel}
        onConfirm={fakeConfirm}
      />
    )
    expect(wrapper.find(".cancel").prop("text")).toBe(testText)
  })

  it("should render correctly if a confirmText prop is passed", () => {
    const wrapper = shallow(
      <ConfirmationModal
        confirmText={testText}
        text={testText}
        onCancel={fakeCancel}
        onConfirm={fakeConfirm}
      />
    )
    expect(wrapper.find(".confirm").prop("text")).toBe(testText)
  })

  it("should render correctly if a onClose prop is passed", () => {
    const wrapper = shallow(
      <ConfirmationModal
        text={testText}
        onCancel={fakeCancel}
        onClose={fakeClose}
        onConfirm={fakeConfirm}
      />
    )
    expect(wrapper.find(".close").exists()).toBe(true)
  })

  it("should fire onClose function if closeIcon is clicked", () => {
    const closeFn = jest.fn()
    const wrapper = shallow(
      <ConfirmationModal
        text={testText}
        onCancel={fakeCancel}
        onClose={closeFn}
        onConfirm={fakeConfirm}
      />
    )
    wrapper.find(".close").simulate("click")
    expect(closeFn).toBeCalledTimes(1)
  })

  it("should fire onCancel function if cancel button is clicked", () => {
    const cancelFn = jest.fn()
    const wrapper = shallow(
      <ConfirmationModal
        text={testText}
        onCancel={cancelFn}
        onConfirm={fakeConfirm}
      />
    )
    wrapper.find(".cancel").simulate("click")
    expect(cancelFn).toBeCalledTimes(1)
  })

  it("should fire onConfirm function if confirm button is clicked", () => {
    const confirmFn = jest.fn()
    const wrapper = shallow(
      <ConfirmationModal
        text={testText}
        onCancel={fakeCancel}
        onConfirm={confirmFn}
      />
    )
    wrapper.find(".confirm").simulate("click")
    expect(confirmFn).toBeCalledTimes(1)
  })
})
