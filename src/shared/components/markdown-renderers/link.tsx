import React, { PureComponent } from "react"
import { Link, LinkProps } from "react-router-dom"

type AToLinkProps = LinkProps & HTMLAnchorElement

class AToLink extends PureComponent<AToLinkProps> {
  public render(): JSX.Element {
    return (
      <Link to={this.props.href} title={this.props.title}>
        {this.props.children}
      </Link>
    )
  }
}

export default AToLink
