// @flow

import React, { PureComponent } from "react"
import { Link } from "react-router-dom"

import type { Link as LinkProps } from "react-router-dom"

class AToLink extends PureComponent<LinkProps> {
  render() {
    return (
      <Link
        to={ this.props.href }
        title={ this.props.title }
      >
        { this.props.children }
      </Link>
    )
  }
}

export default AToLink
