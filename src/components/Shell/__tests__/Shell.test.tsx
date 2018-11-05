import React from "react"
import { mount, shallow } from "enzyme"
import { MemoryRouter as Router } from "react-router-dom"

import { AppBar, AppMain, Shell, Sidebar } from "../../"

describe("<Shell />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <Router>
        <Shell />
      </Router>
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have AppBar component", () => {
    const wrapper = mount(
      <Router>
        <Shell />
      </Router>
    )
    expect(wrapper.find(AppBar).exists()).toBe(true)
    wrapper.unmount()
  })

  it("should have AppMain component", () => {
    const wrapper = mount(
      <Router>
        <Shell />
      </Router>
    )
    expect(wrapper.find(AppMain).exists()).toBe(true)
    wrapper.unmount()
  })

  it("should have Sidebar component", () => {
    const wrapper = mount(
      <Router>
        <Shell />
      </Router>
    )
    expect(wrapper.find(Sidebar).exists()).toBe(true)
    wrapper.unmount()
  })

  it("should toggle sidebar on menuIcon click", () => {
    const wrapper = mount(
      <Router>
        <Shell />
      </Router>
    )
    expect(wrapper.find(Shell).state().sidebarOpen).toBe(true)
    expect(wrapper.find(".closed").exists()).toBe(false)
    wrapper.find(".menuIcon").simulate("click")
    expect(wrapper.find(Shell).state().sidebarOpen).toBe(false)
    expect(wrapper.find(".closed").exists()).toBe(true)
    wrapper.unmount()
  })
})
