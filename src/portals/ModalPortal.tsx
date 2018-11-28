import { Component } from "react"
import ReactDOM from "react-dom"

const modalRoot = document.getElementById("modal")

class ModalPortal extends Component {
  public el = document.createElement("div")

  public componentDidMount() {
    if (modalRoot) {
      modalRoot.appendChild(this.el)
    }
  }

  public componentWillUnmount() {
    if (modalRoot) {
      modalRoot.removeChild(this.el)
    }
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default ModalPortal
