// @flow

import React, { PureComponent } from "react"
import { Link } from "react-router-dom"

import type { Link as LinkProps } from "react-router-dom"

class ULWithListClass extends PureComponent<LinkProps> {
  render() {
    return (
      <ul className="list">
        { this.props.children }
      </ul>
    )
  }
}

export default ULWithListClass 
