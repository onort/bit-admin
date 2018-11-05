import React, { Component } from "react"

import styles from "./Shell.scss"
import { AppBar, AppMain, Sidebar } from "../"

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
        <div className={styles.applicationContainer}>
          <Sidebar sidebarOpen={sidebarOpen} />
          <AppMain sidebarOpen={sidebarOpen}>{this.props.children}</AppMain>
        </div>
      </div>
    )
  }
}

export default Shell
