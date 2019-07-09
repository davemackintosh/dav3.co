import React from "react"
import Helmet from "react-helmet"
import { Link } from "react-router-dom"

import { Match } from "react-router"
import {ContentProps} from "../../../../types/content"

import PostHeaderTags from "@components/tags/post-header-tags"
import { posts } from "@src/routes"

export interface TagPostListProps {
  match: Match,
}

export default function PostsList(props: TagPostListProps) {
  return (
    <div className="posts-list">
      <Helmet>
        <meta name="description" content={`Posts written by Dave Mackintosh tagged with "${props.match.params.tag}"`} />
        <title>Blog posts tagged with &ldquo;{ props.match.params.tag }&rdquo;</title>
      </Helmet>
      <h3>Posts tagged with &ldquo;{ props.match.params.tag }&rdquo;</h3>
      <hr />
      {
        posts
          .filter((post: ContentProps) => Array.isArray(post.frontmatter.keywords))
          .filter((post: ContentProps) => (post.frontmatter.keywords || []).indexOf(props.match.params.tag) >= 0)
          .map((post: ContentProps) => (
            <div key={ post.frontmatter.title } className="post-preview">
              <Link
                to={ post.frontmatter.path }
                title={ post.frontmatter.title }
              >
                <h2>{ post.frontmatter.title }</h2>
              </Link>
              <time dateTime={ post.frontmatter.published }>
                { post.frontmatter.published }
              </time>
              <PostHeaderTags tags={ post.frontmatter.keywords } />

              <p>{post.frontmatter.excerpt || post.markdown.substr(0, 300)}</p>
            </div>
          ))
      }
    </div>
  )
}
