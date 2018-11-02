import React from "react"
import { mount, shallow } from "enzyme"
import { MemoryRouter as Router, NavLink } from "react-router-dom"
import { MdAdd as AddIcon } from "react-icons/md"

import SidebarItem from "../Item"

describe("<SidebarItem />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <Router>
        <SidebarItem icon={<AddIcon />} title="Add" to="/add" />
      </Router>
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have an icon, correct title and target url", () => {
    const title = "Add"
    const targetUrl = "/add"
    const wrapper = mount(
      <Router>
        <SidebarItem icon={<AddIcon />} title={title} to={targetUrl} />
      </Router>
    )
    expect(wrapper.find(AddIcon).exists()).toBe(true)
    expect(wrapper.find(".itemTitle").text()).toBe(title)
    expect(wrapper.find(`[href="${targetUrl}"]`).exists()).toBe(true)
    wrapper.unmount()
  })
})
