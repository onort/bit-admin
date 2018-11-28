import { Component } from "react"
import ReactDOM from "react-dom"

const alertRoot = document.getElementById("alerts")

class AlertPortal extends Component {
  public el = document.createElement("div")

  public componentDidMount() {
    if (alertRoot) {
      alertRoot.appendChild(this.el)
    }
  }

  public componentWillUnmount() {
    if (alertRoot) {
      alertRoot.removeChild(this.el)
    }
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default AlertPortal
