import React from "react"

import styles from "./AppBar.scss"

const AppBar: React.SFC = props => {
  return (
    <header className={styles.container}>
      <div className={styles.appBar}>
        <div className={styles.brandContainer}>
          <span className={styles.brand}>Bmat Bit Admin</span>
        </div>
      </div>
    </header>
  )
}

export default AppBar
