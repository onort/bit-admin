import React from "react"
import cx from "classnames"
import {
  MdAccountCircle as AccountIcon,
  MdAdd as AddIcon,
  MdViewList as ListIcon
} from "react-icons/md"

import styles from "./Sidebar.scss"
import { SidebarItem, SidebarLogout } from "./"
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
      <User>
        {({ data }: any) => (
          <>
            {data.me ? (
              <>
                <SidebarItem icon={<AddIcon />} title="Add" to="/add" />
                <SidebarItem icon={<ListIcon />} title="View" to="/view" />
                <SidebarLogout />
              </>
            ) : (
              <SidebarItem icon={<AccountIcon />} title="Login" to="/login" />
            )}
          </>
        )}
      </User>
    </nav>
  )
}

export default Sidebar
