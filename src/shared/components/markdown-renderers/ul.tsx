import React, { PureComponent } from "react"

class ULWithListClass extends PureComponent {
  public render() {
    return (
      <ul className="list">
        { this.props.children }
      </ul>
    )
  }
}

export default ULWithListClass
