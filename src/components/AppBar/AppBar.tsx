import React from "react"
import { MdMenu as MenuIcon } from "react-icons/md"

import styles from "./AppBar.scss"

interface Props {
  toggleSidebar: () => void
}

const AppBar: React.SFC<Props> = props => {
  return (
    <header className={styles.container}>
      <div className={styles.appBar}>
        <div className={styles.brandContainer}>
          <span className={styles.menuIcon} onClick={props.toggleSidebar}>
            <MenuIcon />
          </span>
          <span className={styles.brand}>Bmat Bit Admin</span>
        </div>
      </div>
    </header>
  )
}

export default AppBar
