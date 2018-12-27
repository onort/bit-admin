import React from "react"
import { shallow } from "enzyme"

import DetailCard, { DetailCardItem, DetailCardTitle } from "../"

const testCardTitle = "TestCardTitle"
const testCardItemTitle = "TestCardItemTitle"
const testCardItemContent = "TestCardItemContent"
const testClassName = "testClassName"
const testUrl = "http://example.com"

describe("<DetailCard />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(
      <DetailCard>
        <DetailCardTitle content={testCardTitle} />
        <DetailCardItem
          content={testCardItemContent}
          linked={true}
          url={testUrl}
          title={testCardItemTitle}
        />
      </DetailCard>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should be able to have custom className", () => {
    const wrapper = shallow(
      <DetailCard className={testClassName}>
        <DetailCardTitle content={testCardTitle} />
      </DetailCard>
    )
    expect(wrapper.find(`.${testClassName}`).exists()).toBe(true)
  })
})
