import React, { Component } from "react"

import styles from "./Shell.scss"
import { AppBar, AppContent, Sidebar } from "../"

interface State {
  sidebarOpen: boolean
}

class Shell extends Component<{}, State> {
  public state = { sidebarOpen: true }
  public toggleSidebar = (): void =>
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  public render() {
    const { sidebarOpen } = this.state
    return (
      <div className={styles.container}>
        <AppBar toggleSidebar={this.toggleSidebar} />
        <div className={styles.applicationMain}>
          <Sidebar sidebarOpen={sidebarOpen} />
          <AppContent sidebarOpen={sidebarOpen}>
            {this.props.children}
          </AppContent>
        </div>
      </div>
    )
  }
}

export default Shell
