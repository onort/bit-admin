import React from "react"
import { shallow } from "enzyme"
import { MemoryRouter as Router } from "react-router-dom"

import NotFound from "../"

describe("<NotFound />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <Router>
        <NotFound />
      </Router>
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
})
