import Markdown from "@components/md-parser/md-parser"
import React from "react"
import Helmet from "react-helmet"

import {ContentProps} from "../../../../types/content"

export default function Page(props: ContentProps): JSX.Element {
  return (
    <div className="mw9 center ph3-ns" id="content">
      <Helmet>
        <title>{ props.frontmatter.title }</title>
        <meta name="description" content={props.frontmatter.description} />
        <meta name="keywords" content={(props.frontmatter.keywords || []).join(" ")} />

        <body className={ props.frontmatter.bodyClasses } />
      </Helmet>

      <Markdown markdown={ props.markdown } />
    </div>
  )
}
