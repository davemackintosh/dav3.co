import React from "react"
import {LatestPostsGrid} from "@styled/latest-posts"
import {ContentProps} from 'types/content';
import {PostPreview} from "@styled/post"
import {NavLink} from "@styled/nav"
import WordCount from "@components/post/word-count"
import PostHeaderTags from "@components/tags/post-header-tags"
import {Published} from "@components/published"

export interface Props {
  numberOfPosts: number
  posts: ContentProps[]
}

export default function LatestPosts(props: Props) {
  return (
    <LatestPostsGrid
      columns={2}
      rows={props.numberOfPosts / 2}
    >
      {
        props.posts.map((post: ContentProps) => {
            const tags = post.frontmatter.keywords && post.frontmatter.keywords.length
              ? <PostHeaderTags tags={post.frontmatter.keywords} />
              : null
          return (
            <PostPreview key={post.contentPath}>
              <h2>
                <NavLink
                  to={post.frontmatter.path}
                >
                  {post.frontmatter.title}
                </NavLink>
              </h2>
              <WordCount text={post.markdown} />
              <Published published={post.frontmatter.published} />
              {tags}
              <p>{post.frontmatter.excerpt}</p>
            </PostPreview>
          )
        })
      }
    </LatestPostsGrid>
  )
}