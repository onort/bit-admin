import React from "react"
import { shallow } from "enzyme"

import AppContent from "../"

describe("<AppContent />", () => {
  it("should match snapshot", () => {
    const wrapper = shallow(<AppContent sidebarOpen={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it("should add proper css class when sidebar is closed.", () => {
    const wrapper = shallow(<AppContent sidebarOpen={false} />)
    expect(wrapper.find("main").hasClass("closed")).toBe(true)
  })

  it("should render children correctly", () => {
    const testP = "My test paragraph."
    const wrapper = shallow(
      <AppContent sidebarOpen={true}>
        <p data-testid="testParagraph">{testP}</p>
      </AppContent>
    )
    expect(wrapper.find('[data-testid="testParagraph"]').text()).toBe(testP)
  })

  it("should be able to have custom classnames", () => {
    const wrapper = shallow(
      <AppContent className="myCustomClass" sidebarOpen={false} />
    )
    expect(wrapper.find("main").hasClass("myCustomClass")).toBe(true)
  })
})
