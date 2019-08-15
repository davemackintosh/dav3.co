import React from "react"
import Helmet from "react-helmet"
import {Link, withRouter, RouteComponentProps} from "react-router-dom"
import WordCount from "@components/post/word-count"
import PostHeaderTags from "@components/tags/post-header-tags"
import {paginatedPosts, posts} from "@src/routes"
import {PostList, PostPreview} from "@styled/post"
import {siteConfig} from '@config';
import Paginate from '@components/paginate';
import {ContentProps} from 'types/content';

interface Props extends RouteComponentProps<{
  page: string
}> {}

function PostsList(props: Props) {
  const currentPage = Number(props.match.params.page || 0)
  const pageTitlePageNum = currentPage > 1
    ? ""
    : `- page ${currentPage + 1}`
  const perPage = siteConfig.postsPerPage || 10

  const paginator = posts.length > perPage
    ? (<Paginate perPage={perPage} totalItems={posts.length - 1} route="/blog" />)
    : null

  console.log(paginatedPosts, currentPage)
 
  return (
    <PostList>
      <Helmet>
        { /* tslint:disable-next-line:max-line-length */}
        <meta name="description" content="Read Dave Mackintosh's blog posts, this is a list of the most recent writings but you can also filter by tags that you see." />
        <title>
          Blog posts by Dave Mackintosh {pageTitlePageNum}
        </title>
      </Helmet>
      {
        paginatedPosts[currentPage]
          .map((post: ContentProps) => (
            <li>
              <PostPreview key={post.frontmatter.title}>
                <Link
                  to={post.frontmatter.path}
                  title={post.frontmatter.title}
                >
                  <h2>{post.frontmatter.title}</h2>
                </Link>
                <WordCount text={post.markdown} />
                <time dateTime={post.frontmatter.published}>
                  {new Date(post.frontmatter.published).toLocaleString()}
                </time>
                <PostHeaderTags tags={post.frontmatter.keywords} />

                <p>{post.frontmatter.excerpt}</p>
              </PostPreview>
            </li>
          ))
      }
      {paginator}
    </PostList>
  )
}

export default withRouter(PostsList)
