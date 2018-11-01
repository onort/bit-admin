import React from "react"

import styles from "./App.scss"
import Routes from "./routes"

const App: React.SFC = () => {
  return (
    <div className={styles.appContainer}>
      <Routes />
    </div>
  )
}

export default App
