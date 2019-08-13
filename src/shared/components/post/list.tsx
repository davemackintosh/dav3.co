import React from "react"
import Helmet from "react-helmet"
import { Link } from "react-router-dom"

import {ContentProps} from "../../../../types/content"

import WordCount from "@components/post/word-count"
import PostHeaderTags from "@components/tags/post-header-tags"
import { posts } from "@src/routes"
import {PostList, PostPreview} from "@styled/post"

export default function PostsList() {
  return (
    <PostList>
      <Helmet>
        { /* tslint:disable-next-line:max-line-length */}
        <meta name="description" content="Read Dave Mackintosh's blog posts, this is a list of the most recent writings but you can also filter by tags that you see." />
        <title>Blog posts by Dave Mackintosh</title>
      </Helmet>

      {
        posts.map((post: ContentProps) => (
          <li>
            <PostPreview key={post.frontmatter.title}>
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
            </PostPreview>
          </li>
        ))
      }
    </PostList>
  )
}
