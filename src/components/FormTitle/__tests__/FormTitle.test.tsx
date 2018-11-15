import React from "react"
import { shallow } from "enzyme"
import { MdAdd as AddIcon } from "react-icons/md"

import FormTitle from "../"

const testTitle = "Test"
const testClassName = "testClassName"

describe("<FormTitle />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<FormTitle icon={<AddIcon />} title={testTitle} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render title", () => {
    const wrapper = shallow(<FormTitle title={testTitle} />)
    expect(wrapper.find(".title").text()).toBe(testTitle)
  })

  it("should render icon", () => {
    const wrapper = shallow(<FormTitle icon={<AddIcon />} title={testTitle} />)
    expect(wrapper.find(AddIcon).exists()).toBe(true)
  })

  it("should have custom classname", () => {
    const wrapper = shallow(
      <FormTitle className={testClassName} title={testTitle} />
    )
    expect(wrapper.find(".container").hasClass(testClassName)).toBe(true)
  })
})
