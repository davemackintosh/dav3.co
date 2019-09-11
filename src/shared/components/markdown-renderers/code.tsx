import { XmlEntities } from "html-entities"
import React, { PureComponent } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

export interface CodeProps {
  language: string
  value: string
}

class CodeRenderer extends PureComponent<CodeProps> {
  public render(): JSX.Element {
    const { decode } = new XmlEntities()
    return (
      <SyntaxHighlighter language={this.props.language} showLineNumbers={true}>
        {decode(this.props.value)}
      </SyntaxHighlighter>
    )
  }
}

export default CodeRenderer
