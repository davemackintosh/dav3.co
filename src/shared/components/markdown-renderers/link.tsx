import React, { PureComponent } from "react"
import { Link, LinkProps } from "react-router-dom"

type AToLinkProps = LinkProps & HTMLAnchorElement

class AToLink extends PureComponent<AToLinkProps> {
  public render(): JSX.Element {
    if (this.props.href.startsWith("http"))
      return (
        <a
          href={this.props.href}
          title={this.props.title}
          rel="noopener noreferrer"
        >
          {this.props.children}
        </a>
      )

    return (
      <Link to={this.props.href} title={this.props.title}>
        {this.props.children}
      </Link>
    )
  }
}

export default AToLink
