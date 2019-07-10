import React from "react"
import Markdown from "react-markdown"
import renderers from "../markdown-renderers/all"

export interface ParserProps {
  markdown: string,
}

export default function MDParser(props: ParserProps) {
  return (
    <Markdown
      source={ props.markdown }
      renderers={ renderers }
      escapeHtml={ false }
    />
  )
}
