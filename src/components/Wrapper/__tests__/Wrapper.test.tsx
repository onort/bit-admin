import React from "react"
import { shallow } from "enzyme"

import Wrapper from "../"

const testClassName = "testClassName"

describe("<Wrapper />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<Wrapper />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have a custom className", () => {
    const wrapper = shallow(<Wrapper className={testClassName} />)
    expect(wrapper.find(".wrapper").hasClass(testClassName)).toBe(true)
  })
})
