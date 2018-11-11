import React from "react"
import cx from "classnames"
import { MdAdd as AddIcon, MdViewList as ListIcon } from "react-icons/md"

import styles from "./Sidebar.scss"
import SidebarItem from "./Item"
import { User } from "../"

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
      <User>
        {({ data }: any) => {
          console.log("data", data)
          if (data.me) return <p>{data.me.name}</p>
          else return null
        }}
      </User>
    </nav>
  )
}

export default Sidebar
