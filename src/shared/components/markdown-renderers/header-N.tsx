import React, { Component, createElement } from "react"
import styled from "styled-components"
import { NavLink } from "@src/shared/theme/nav"

export interface HeaderNProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: JSX.Element[]
}

type HeaderCBProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

const Header = (
  props: HeaderNProps,
): ((innerProps: HeaderCBProps) => JSX.Element) => {
  const level = props.level
  return function InnerHeader(innerProps): JSX.Element {
    return createElement("h" + level, innerProps)
  }
}

export const Permalink = styled(NavLink)`
  margin-right: 0.5em;
`

class HeaderN extends Component<HeaderNProps> {
  public render(): JSX.Element {
    const Heading = Header(this.props)
    const targetChild = this.props.children[0]

    const id = !targetChild
      ? ""
      : targetChild.props.children
          .replace(/[\W-&]+/g, "-") // Remove all non-alphanumeric
          .replace(/-+/g, "-") // Replace multiple heiphens with a single one
          .toLowerCase()

    return (
      <Heading id={id}>
        <Permalink
          to={"#" + id}
          title={`Permalink to jump to this header - '${id}'`}
        >
          #
        </Permalink>
        {this.props.children}
      </Heading>
    )
  }
}

export default HeaderN
