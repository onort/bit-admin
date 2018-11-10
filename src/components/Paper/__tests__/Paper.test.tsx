import React from "react"
import { shallow } from "enzyme"

import Paper from "../"

describe("<Paper />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<Paper elevation={1} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have correct elevation class", () => {
    const wrapper = shallow(<Paper elevation={1} />)
    expect(wrapper.find("div").hasClass("elevation1")).toBe(true)
  })

  it("should be able to have a custom className", () => {
    const testClassName = "test"
    const wrapper = shallow(<Paper elevation={1} className={testClassName} />)
    expect(wrapper.find("div").hasClass(testClassName)).toBe(true)
  })
})
