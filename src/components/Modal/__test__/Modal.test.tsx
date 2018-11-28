import React from "react"
import { shallow } from "enzyme"

import Modal from "../"

const testMessage = "Test message."
const testClassName = "testClassName"

describe("<Modal />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <Modal>
        <p>{testMessage}</p>
      </Modal>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have text rendered", () => {
    const wrapper = shallow(
      <Modal>
        <p>{testMessage}</p>
      </Modal>
    )
    expect(wrapper.find("p").text()).toBe(testMessage)
  })

  it("should be able to have a custom className", () => {
    const wrapper = shallow(
      <Modal className={testClassName}>
        <p>{testMessage}</p>
      </Modal>
    )
    expect(wrapper.find(".container").hasClass(testClassName)).toBe(true)
  })
})
