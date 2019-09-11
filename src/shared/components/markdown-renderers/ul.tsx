import React, { PureComponent } from "react"

interface ULWithListClassProps {
  children: JSX.Element | JSX.Element[]
}

class ULWithListClass extends PureComponent<ULWithListClassProps> {
  public render(): JSX.Element {
    return <ul className="list">{this.props.children}</ul>
  }
}

export default ULWithListClass
