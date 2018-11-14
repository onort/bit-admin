import React from "react"
import cx from "classnames"
import { MdAdd as AddIcon, MdViewList as ListIcon } from "react-icons/md"

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
      <SidebarItem icon={<AddIcon />} title="Add" to="/add" />
      <SidebarItem icon={<ListIcon />} title="View" to="/view" />
      <SidebarLogout />
    </nav>
  )
}

export default Sidebar
