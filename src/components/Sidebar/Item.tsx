import React from "react"
import { NavLink } from "react-router-dom"
import cx from "classnames"

import styles from "./Sidebar.scss"
import { AppRoute } from "../../routes"

interface Props {
  className?: string
  icon: React.ReactNode
  title: string
  to: AppRoute
}

const Item: React.SFC<Props> = props => {
  const { className, icon, title, to } = props
  const componentClassName = cx(styles.item, className)
  return (
    <NavLink
      to={to}
      className={componentClassName}
      activeClassName={styles.active}
    >
      <span className={styles.itemIcon}>{icon}</span>
      <span className={styles.itemTitle}>{title}</span>
    </NavLink>
  )
}

export default Item
