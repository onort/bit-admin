import React from "react"
import { shallow } from "enzyme"

import Notification from "../"

const testMessage = "Test message."
const testClassName = "testClassName"

describe("<Notification />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<Notification message={testMessage} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have text rendered", () => {
    const wrapper = shallow(<Notification message={testMessage} />)
    expect(wrapper.find(".message").text()).toBe(testMessage)
  })

  it("should render correctly if a type prop is passed", () => {
    const wrapper = shallow(<Notification message={testMessage} type="error" />)
    expect(wrapper.find(".container").hasClass("error")).toBe(true)
  })

  it("should be able to have a custom className", () => {
    const wrapper = shallow(
      <Notification message={testMessage} className={testClassName} />
    )
    expect(wrapper.find(".container").hasClass(testClassName)).toBe(true)
  })
})
