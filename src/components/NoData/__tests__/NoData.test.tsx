import React from "react"
import { shallow } from "enzyme"

import NoData from "../"

const testMessage = "No data message test."
const testClassName = "testClassName"

describe("<NoData />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<NoData />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render message", () => {
    const wrapper = shallow(<NoData message={testMessage} />)
    expect(wrapper.find(".message").text()).toBe(testMessage)
  })

  it("should have custom classname", () => {
    const wrapper = shallow(<NoData className={testClassName} />)
    expect(wrapper.find(".container").hasClass(testClassName)).toBe(true)
  })
})
