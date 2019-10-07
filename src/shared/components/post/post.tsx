import Markdown from "@components/md-parser/md-parser"
import React from "react"
import { Helmet } from "react-helmet"

import { ContentProps } from "../../../../types/content"

import PostHeaderTags from "@components/tags/post-header-tags"
import WordCount from "@src/shared/components/post/word-count"
import { Published } from "@src/shared/components/published"

export default function Post(props: ContentProps): JSX.Element {
  const tags =
    props.frontmatter.keywords && props.frontmatter.keywords.length ? (
      <PostHeaderTags tags={props.frontmatter.keywords} />
    ) : null
  return (
    <article>
      <Helmet>
        <title>{props.frontmatter.title}</title>
        <meta name="description" content={props.frontmatter.description} />
        <meta
          name="keywords"
          content={(props.frontmatter.keywords || []).join(" ")}
        />

        <body className={props.frontmatter.bodyClasses} />
      </Helmet>

      <h1>{props.frontmatter.title}</h1>
      <WordCount text={props.markdown} />
      <Published published={props.frontmatter.published} />
      {tags}
      <Markdown markdown={props.markdown} />
    </article>
  )
}
