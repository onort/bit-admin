import React from "react"
import { shallow } from "enzyme"

import Container from "../"

const testP = "My test paragraph."
const testClassName = "testClass"

describe("<Container />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <Container>
        <p>{testP}</p>
      </Container>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it("should have correct css class if narrow is set", () => {
    const wrapper = shallow(
      <Container narrow="narrow">
        <p>{testP}</p>
      </Container>
    )
    expect(wrapper.find("div").hasClass("narrow")).toBe(true)
  })

  it("should be able to have custom classes", () => {
    const wrapper = shallow(
      <Container className={testClassName}>
        <p>{testP}</p>
      </Container>
    )
    expect(wrapper.find("div").hasClass(testClassName)).toBe(true)
  })
})
