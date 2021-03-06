import React, { PureComponent } from "react"
import { Link } from "react-router-dom"

type AToLinkProps = HTMLAnchorElement & { to?: string }

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
