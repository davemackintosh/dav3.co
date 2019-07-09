// @flow

import React from "react"
import Helmet from "react-helmet"
import Markdown from "@components/md-parser/md-parser"

import type { ContentProps } from "@flow/content.flow"

export default function Page(props: ContentProps) {
  return (
    <div className="mw9 center ph3-ns" id="content">
      <Helmet>
        <title>{ props.frontmatter.title }</title>
        <meta name="description" value={ props.frontmatter.description } />
        <meta name="keywords" value={ props.frontmatter.keywords } />
    
        <body className={ props.frontmatter.bodyClasses } />
      </Helmet>

      <Markdown markdown={ props.markdown } />
    </div>
  )
}
