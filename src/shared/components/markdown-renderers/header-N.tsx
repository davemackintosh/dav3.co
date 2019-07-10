import React, {createElement, PureComponent} from "react"

export interface HeaderNProps {
  level: 1 | 2 | 3 | 4 | 5 | 6,
  children: JSX.Element[],
}

const Header = (props: HeaderNProps) => {
  return (
    innerProps: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
      >,
  ): JSX.Element => createElement("h" + props.level, innerProps)
}

class HeaderN extends PureComponent<HeaderNProps> {
  public render() {
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
        <a
          href={ "#" + id }
          title={ `Permalink to jump to this header - '${id}'` }>
            #
        </a>
        { this.props.children }
      </Heading>
    )
  }
}

export default HeaderN
