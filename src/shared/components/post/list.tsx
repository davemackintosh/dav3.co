import React from "react"
import { Helmet } from "react-helmet"
import { Link, withRouter, RouteComponentProps } from "react-router-dom"
import WordCount from "@components/post/word-count"
import PostHeaderTags from "@components/tags/post-header-tags"
import { paginatedPosts, posts } from "@src/routes"
import { PostList, PostPreview } from "@styled/post"
import { siteConfig } from "@config"
import Paginate from "@components/paginate"
import { ContentProps } from "types/content"
import { Published } from "@src/shared/components/published"
import PostStatus from "@src/shared/components/post/post-status"

type Props = RouteComponentProps<{
  page: string
}>

function PostsList(props: Props): JSX.Element {
  const currentPage = Number(props.match.params.page || 0)
  const pageTitlePageNum = currentPage > 1 ? "" : `- page ${currentPage + 1}`
  const perPage = siteConfig.postsPerPage || 10

  const paginator =
    posts.length > perPage ? (
      <Paginate perPage={perPage} totalItems={posts.length - 1} route="/blog" />
    ) : null

  return (
    <PostList>
      <Helmet>
        <meta
          name="description"
          content="Read Dave Mackintosh's blog posts, this is a list of the most recent writings but you can also filter by tags that you see." // eslint-disable-line max-len
        />
        <title>Blog posts by Dave Mackintosh {pageTitlePageNum}</title>
      </Helmet>
      {paginatedPosts[currentPage].map((post: ContentProps) => {
        const tags =
          post.frontmatter.keywords && post.frontmatter.keywords.length ? (
            <PostHeaderTags tags={post.frontmatter.keywords} />
          ) : null

        const postStatus = PostStatus(post.frontmatter.status as string)

        return (
          <li key={post.frontmatter.path}>
            <PostPreview key={post.frontmatter.title}>
              <h2>
                <Link to={post.frontmatter.path} title={post.frontmatter.title}>
                  {post.frontmatter.title}
                </Link>
                {postStatus}
              </h2>
              <WordCount text={post.markdown} />

              <Published published={post.frontmatter.published} />

              {tags}
              <hr />
              <p>{post.frontmatter.excerpt}</p>
            </PostPreview>
          </li>
        )
      })}
      {paginator}
    </PostList>
  )
}

export default withRouter(PostsList)
