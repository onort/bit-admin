import React from "react"
import { shallow } from "enzyme"

import Loading from "../"

const testClassName = "testClassName"

describe("<Loading />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<Loading />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render fullscreen", () => {
    const wrapper = shallow(<Loading fullscreen={true} />)
    expect(wrapper.find(".container").hasClass("fullscreen")).toBe(true)
  })

  it("should have custom classname", () => {
    const wrapper = shallow(<Loading className={testClassName} />)
    expect(wrapper.find(".container").hasClass(testClassName)).toBe(true)
  })

  it("should have custom dot classname", () => {
    const wrapper = shallow(<Loading dotClassName={testClassName} />)
    expect(wrapper.find(".dot1").hasClass(testClassName)).toBe(true)
  })
})
