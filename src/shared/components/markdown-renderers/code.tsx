import {XmlEntities} from "html-entities"
import React, { PureComponent } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/styles/prism"

export interface CodeProps {
  language: string,
  value: string,
}

class CodeRenderer extends PureComponent<CodeProps> {
  public render() {
    const {decode} = new XmlEntities()
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
