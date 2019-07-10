import React, {createElement, PureComponent} from "react"

export interface HeaderNProps {
  level: 1 | 2 | 3 | 4 | 5 | 6,
  children: JSX.Element[],
}

class HeaderN extends PureComponent<HeaderNProps> {
  public render() {
    const Header = createElement<{children: JSX.Element[], id: string}>("h" + this.props.level)
    const targetChild = this.props.children[0]

    const id = !targetChild
      ? ""
      : targetChild.props.children
        .replace(/[\W-&]+/g, "-") // Remove all non-alphanumeric
        .replace(/-+/g, "-") // Replace multiple heiphens with a single one
        .toLowerCase()

    return (
      <Header id={ id }>
        <a
          href={ "#" + id }
          title={ `Permalink to jump to this header - '${id}'` }>
            #
        </a>
        { this.props.children }
      </Header>
    )
  }
}

export default HeaderN
