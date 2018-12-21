import React from "react"
import { shallow } from "enzyme"

import FormRow from "../"

describe("<FormRow />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <FormRow>
        <span />
      </FormRow>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should be able to have custom class", () => {
    const testClassName = "test"
    const wrapper = shallow(
      <FormRow className={testClassName}>
        <span />
      </FormRow>
    )
    expect(wrapper.find("div").hasClass(testClassName)).toBe(true)
  })
})
