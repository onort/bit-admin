import React from "react"

import styles from "./App.scss"
import { Shell } from "./components"

const App: React.SFC = () => {
  return (
    <div className={styles.appContainer}>
      <Shell>
        <p>Conntent passed from App.</p>
      </Shell>
    </div>
  )
}

export default App
