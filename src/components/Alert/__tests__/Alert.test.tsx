import React from "react"
import { shallow } from "enzyme"

import Alert from "../"

const testMessage = "Test message."
const testClassName = "testClassName"

describe("<Alert />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<Alert message={testMessage} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have text rendered", () => {
    const wrapper = shallow(<Alert message={testMessage} />)
    expect(wrapper.find(".message").text()).toBe(testMessage)
  })

  it("should render correctly if a type prop is passed", () => {
    const wrapper = shallow(<Alert message={testMessage} type="error" />)
    expect(wrapper.find(".container").hasClass("error")).toBe(true)
  })

  it("should be able to have a custom className", () => {
    const wrapper = shallow(
      <Alert message={testMessage} className={testClassName} />
    )
    expect(wrapper.find(".container").hasClass(testClassName)).toBe(true)
  })
})
