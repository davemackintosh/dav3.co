import React, { PureComponent } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/styles/prism"
import decode from "unescape"

export interface CodeProps {
  language: string,
  value: string,
}

class CodeRenderer extends PureComponent<CodeProps> {
  public render() {
    return (
      <SyntaxHighlighter
        language={ this.props.language }
        style={ atomDark }
        showLineNumbers={ true }
      >
        { decode(this.props.value) }
      </SyntaxHighlighter>
    )
  }
}

export default CodeRenderer
