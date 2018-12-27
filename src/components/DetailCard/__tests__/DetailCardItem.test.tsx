import React from "react"
import { shallow } from "enzyme"

import { DetailCardItem } from "../"

const testCardItemTitle = "TestCardItemTitle"
const testCardItemContent = "TestCardItemContent"
const testClassName = "testClassName"
const testUrl = "http://example.com"

describe("<DetailCardItem />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <DetailCardItem
        content={testCardItemContent}
        linked={true}
        url={testUrl}
        title={testCardItemTitle}
      />
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should display passed content and title", () => {
    const wrapper = shallow(
      <DetailCardItem content={testCardItemContent} title={testCardItemTitle} />
    )
    expect(wrapper.find(".itemTitle").text()).toBe(testCardItemTitle)
    expect(wrapper.find(".itemContent").text()).toBe(testCardItemContent)
  })

  it("should display have a link if it's linked and passed a url", () => {
    const wrapper = shallow(
      <DetailCardItem
        content={testCardItemContent}
        linked={true}
        url={testUrl}
        title={testCardItemTitle}
      />
    )
    expect(wrapper.find("a").exists()).toBe(true)
    expect(wrapper.find("a").prop("href")).toBe(testUrl)
  })

  it("should be able to have custom className", () => {
    const wrapper = shallow(
      <DetailCardItem
        className={testClassName}
        content={testCardItemContent}
        title={testCardItemTitle}
      />
    )
    expect(wrapper.find(`.${testClassName}`).exists()).toBe(true)
  })
})
