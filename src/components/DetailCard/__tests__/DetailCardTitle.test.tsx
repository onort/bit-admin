import React from "react"
import { shallow } from "enzyme"

import { DetailCardTitle } from "../"

const testCardTitle = "TestCardTitle"
const testClassName = "testClassName"

describe("<DetailCardTitle />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<DetailCardTitle content={testCardTitle} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should display passed content", () => {
    const wrapper = shallow(<DetailCardTitle content={testCardTitle} />)
    expect(wrapper.find(".title").text()).toBe(testCardTitle)
  })

  it("should be able to have custom className", () => {
    const wrapper = shallow(
      <DetailCardTitle className={testClassName} content={testCardTitle} />
    )
    expect(wrapper.find(`.${testClassName}`).exists()).toBe(true)
  })
})
