import React from "react"
import {LatestPostsGrid} from "@styled/latest-posts"
import {ContentProps} from 'types/content';
import {PostPreview} from "@styled/post"
import {NavLink} from "@styled/nav"
import WordCount from "@components/post/word-count"
import PostHeaderTags from "@components/tags/post-header-tags"

export interface Props {
  numberOfPosts: number
  posts: ContentProps[]
}

export default function LatestPosts(props: Props) {
  alert(props.posts.length)
  return (
    <LatestPostsGrid
      columns={2}
      rows={props.numberOfPosts / 2}
    >
      {
        props.posts.map((post: ContentProps) => (
          <PostPreview key={post.contentPath}>
            <h2>
              <NavLink
                to={post.frontmatter.path}
              >
                {post.contentPath}
              </NavLink>
            </h2>
            <WordCount text={post.markdown} />
            <time dateTime={post.frontmatter.published}>
              {new Date(post.frontmatter.published).toLocaleString()}
              <PostHeaderTags tags={post.frontmatter.keywords} />
            </time>
            <p>{post.frontmatter.excerpt}</p>
          </PostPreview>
        ))
      }
    </LatestPostsGrid>
  )
}
