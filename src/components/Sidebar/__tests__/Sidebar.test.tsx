import React from "react"
import { mount, shallow } from "enzyme"
import { MemoryRouter as Router, NavLink } from "react-router-dom"

import Sidebar from "../"

describe("<Sidebar />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <Router>
        <Sidebar sidebarOpen={true} />
      </Router>
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have correct amount of links", () => {
    const wrapper = mount(
      <Router>
        <Sidebar sidebarOpen={true} />
      </Router>
    )
    expect(wrapper.find(NavLink)).toHaveLength(4)
    wrapper.unmount()
  })
})
