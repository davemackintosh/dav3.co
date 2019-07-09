// @flow

import React from "react"
import { Link } from "react-router-dom"
import Helmet from "react-helmet"

import type { PostProps } from "@flow/content.flow"

import { posts } from "@src/routes"
import WordCount from "@components/post/word-count"
import PostHeaderTags from "@components/tags/post-header-tags"

export default function PostsList() {
  return (
    <div className="posts-list">
      <Helmet>
        <meta name="description" value="Read Dave Mackintosh's blog posts, this is a list of the most recent writings but you can also filter by tags that you see." /> { /* eslint-disable-line max-len */ }
        <title>Blog posts by Dave Mackintosh</title>
      </Helmet>
      {
        posts.map((post: PostProps) => (
          <div key={ post.frontmatter.title } className="post-preview">
            <Link 
              to={ post.frontmatter.path }
              title={ post.frontmatter.title }
            >
              <h2>{ post.frontmatter.title }</h2>
            </Link>
            <WordCount text={ post.markdown } />
            <time dateTime={ post.frontmatter.published }>
              { new Date(post.frontmatter.published).toLocaleString() }
            </time>
            <PostHeaderTags tags={ post.frontmatter.keywords } />

            <p>{ post.frontmatter.excerpt }</p>
          </div>
        ))
      }
    </div>
  )
}
