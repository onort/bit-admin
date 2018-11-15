import React from "react"
import { shallow } from "enzyme"

import ErrorMessage from "../"

const testMessage = "Test message."
const testClassName = "testClassName"

describe("<ErrorMessage />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<ErrorMessage message={testMessage} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have text rendered", () => {
    const wrapper = shallow(<ErrorMessage message={testMessage} />)
    expect(wrapper.find("span").text()).toBe(testMessage)
  })

  it("should render correctly if small prop passed", () => {
    const wrapper = shallow(<ErrorMessage message={testMessage} small={true} />)
    expect(wrapper.find(".container").hasClass("small")).toBe(true)
  })

  it("should be able to have a custom className", () => {
    const wrapper = shallow(
      <ErrorMessage message={testMessage} className={testClassName} />
    )
    expect(wrapper.find(".container").hasClass(testClassName)).toBe(true)
  })
})
