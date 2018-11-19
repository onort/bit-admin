import React from "react"
import { Link } from "react-router-dom"

import styles from "./NotFound.scss"
import { Wrapper } from "../"

const NotFound: React.SFC = props => {
  return (
    <Wrapper>
      <div className={styles.container}>
        <span className={styles.code}>404</span>
        <span className={styles.message}>
          The page you're looking for cannot be found. Make sure you have
          entered the page address correctly.
        </span>
        <Link className={styles.action} to="/">
          Homepage
        </Link>
      </div>
    </Wrapper>
  )
}

export default NotFound
