import { XmlEntities } from "html-entities"
import React, { PureComponent } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import theme from "./code-theme"

export interface CodeProps {
  language: string
  value: string
}

class CodeRenderer extends PureComponent<CodeProps> {
  public render(): JSX.Element {
    const { decode } = new XmlEntities()
    const language = this.props.language.split(":")
    const codeElement = (
      <SyntaxHighlighter
        language={language[0]}
        showLineNumbers={true}
        style={theme}
      >
        {decode(this.props.value)}
      </SyntaxHighlighter>
    )

    if (language.length === 1) return codeElement
    else
      return (
        <details>
          <summary>{language[1]}:</summary>
          {codeElement}
        </details>
      )
  }
}

export default CodeRenderer
