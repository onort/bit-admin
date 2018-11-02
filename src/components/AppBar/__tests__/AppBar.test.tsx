import React from "react"
import { shallow } from "enzyme"

import AppBar from "../"

describe("<AppBar />", () => {
  it("should match snapshot", () => {
    const toggleSidebar = jest.fn()
    const wrapper = shallow(<AppBar toggleSidebar={toggleSidebar} />)
    expect(wrapper).toMatchSnapshot()
  })

  it("should fire toggleSidebar when menu icon is clicked", () => {
    const toggleSidebar = jest.fn()
    const wrapper = shallow(<AppBar toggleSidebar={toggleSidebar} />)
    wrapper.find(".menuIcon").simulate("click")
    expect(toggleSidebar).toBeCalledTimes(1)
  })
})
