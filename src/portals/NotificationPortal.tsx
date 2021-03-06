import { Component } from "react"
import ReactDOM from "react-dom"

const notificationRoot = document.getElementById("notification")

class NotificationPortal extends Component {
  public el = document.createElement("div")

  public componentDidMount() {
    if (notificationRoot) {
      notificationRoot.appendChild(this.el)
    }
  }

  public componentWillUnmount() {
    if (notificationRoot) {
      notificationRoot.removeChild(this.el)
    }
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default NotificationPortal
