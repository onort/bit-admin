import React from "react"
import cx from "classnames"
import {
  MdAdd as AddIcon,
  MdViewList as ViewBitsIcon,
  MdViewStream as ViewTagsIcon,
  MdLocalOffer as TagIcon
} from "react-icons/md"

import styles from "./Sidebar.scss"
import { SidebarItem, SidebarLogout } from "./"

interface Props {
  className?: string
  sidebarOpen: boolean
}

const Sidebar: React.SFC<Props> = props => {
  const className = cx(
    styles.container,
    { [styles.closed]: !props.sidebarOpen },
    props.className
  )
  return (
    <nav className={className}>
      <SidebarItem icon={<AddIcon />} title="Add Bit" to="/add-bit" />
      <SidebarItem icon={<TagIcon />} title="Add Tag" to="/add-tag" />
      <SidebarItem icon={<ViewBitsIcon />} title="View Bits" to="/view-bits" />
      <SidebarItem icon={<ViewTagsIcon />} title="View Tags" to="/view-tags" />
      <SidebarLogout />
    </nav>
  )
}

export default Sidebar
