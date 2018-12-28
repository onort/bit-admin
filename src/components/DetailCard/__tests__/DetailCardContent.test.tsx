import React from "react"
import { shallow } from "enzyme"

import { DetailCardContent } from "../"

const testContent = "Test content."
const testClassName = "testClassName"

describe("<DetailCardContent />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <DetailCardContent>
        <span>{testContent}</span>
      </DetailCardContent>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should display passed content", () => {
    const wrapper = shallow(
      <DetailCardContent>
        <span>{testContent}</span>
      </DetailCardContent>
    )
    expect(wrapper.find("span").text()).toBe(testContent)
  })

  it("should be able to have custom className", () => {
    const wrapper = shallow(
      <DetailCardContent className={testClassName}>
        <span>{testContent}</span>
      </DetailCardContent>
    )
    expect(wrapper.find(`.${testClassName}`).exists()).toBe(true)
  })
})
