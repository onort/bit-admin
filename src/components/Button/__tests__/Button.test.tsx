import React from "react"
import { shallow } from "enzyme"
import { MdAdd as AddIcon } from "react-icons/md"

import Button from "../"

const testText = "Test"
const testClassName = "testClassName"

describe("<Button />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<Button text={testText} />)
    expect(wrapper).toMatchSnapshot()
  })

  it("should have text rendered", () => {
    const wrapper = shallow(<Button text={testText} />)
    expect(wrapper.find("button").text()).toBe(testText)
  })

  it("should render an icon component if passed through prop", () => {
    const wrapper = shallow(<Button text={testText} icon={<AddIcon />} />)
    expect(wrapper.find(AddIcon).exists()).toBe(true)
  })

  it("should be able to have a custom className", () => {
    const wrapper = shallow(
      <Button text={testText} className={testClassName} />
    )
    expect(wrapper.find("button").hasClass(testClassName)).toBe(true)
  })

  it("should fire onClick when button is clicked", () => {
    const handleClick = jest.fn()
    const wrapper = shallow(<Button text={testText} onClick={handleClick} />)
    wrapper.find("button").simulate("click")
    expect(handleClick).toBeCalledTimes(1)
  })
})
