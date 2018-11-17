import React, { Component } from "react"
import cx from "classnames"

import styles from "./Table.scss"

interface Props {
  className?: string
  children: React.ReactNode
}

class Table extends Component<Props, any> {
  public render() {
    const className = cx(styles.table, this.props.className)
    return <table className={className}>{this.props.children}</table>
  }
}

export default Table
