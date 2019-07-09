// @flow

import React from "react"
import Markdown from "react-markdown"
import renderers from "../markdown-renderers/all"

export type ParserProps = {
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
