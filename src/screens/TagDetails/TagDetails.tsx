import React, { Component } from "react"

import styles from "./TagDetails.scss"
import { Container, Shell } from "../../components"
import { DetailView } from "./"

class TagDetails extends Component {
  public render() {
    return (
      <Shell>
        <Container>
          <DetailView />
        </Container>
      </Shell>
    )
  }
}

export default TagDetails
