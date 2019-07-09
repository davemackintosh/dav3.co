// @flow

import React from "react"
import Helmet from "react-helmet"
import Markdown from "@components/md-parser/md-parser"

import type { ContentProps } from "@flow/content.flow"

import PostHeaderTags from "@components/tags/post-header-tags"

export default function Post(props: ContentProps) {
  return (
    <article className="post">
      <Helmet>
        <title>{ props.frontmatter.title }</title>
        <meta name="description" value={ props.frontmatter.description } />
        <meta name="keywords" value={ props.frontmatter.keywords } />
    
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
