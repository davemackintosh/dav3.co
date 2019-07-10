import Markdown from "@components/md-parser/md-parser"
import React from "react"
import Helmet from "react-helmet"

import {ContentProps} from "../../../../types/content"

import PostHeaderTags from "@components/tags/post-header-tags"

export default function Post(props: ContentProps) {
  return (
    <article className="post">
      <Helmet>
        <title>{ props.frontmatter.title }</title>
        <meta name="description" content={props.frontmatter.description} />
        <meta name="keywords" content={props.frontmatter.keywords} />

        <body className={ props.frontmatter.bodyClasses } />
      </Helmet>
      <div className="post-header">
        <h1>{ props.frontmatter.title }</h1>
        <PostHeaderTags tags={ props.frontmatter.keywords } />
      </div>
      <Markdown
        markdown={ props.markdown }
      />
    </article>
  )
}
