import Page from "@components/page/page"
import PostsList from "@components/post/list"
import Post from "@components/post/post"
import {siteConfig} from "@config"
import React from "react"
import {RouteProps} from "react-router"
import {
  ContentProps,
} from "../types/content"

type ComponentType = typeof Post | typeof Page

const postsPerPage = siteConfig && siteConfig.postsPerPage
  ? siteConfig.postsPerPage
  : 10

const parseNodeSpaceContent = (content: string): ContentProps[] =>
  JSON.parse(content)

function routesFromNodeSpace(contents: ContentProps[], component: ComponentType): RouteProps[] {
  const Renderable = component

  return contents.map((content: ContentProps): RouteProps => {
    const path = content.frontmatter.path
      ? content.frontmatter.path
      : "/" + content.contentPath.substr(0, content.contentPath.lastIndexOf("."))

    if (content.frontmatter.title) {
      content.frontmatter.title = unescape(content.frontmatter.title)
    }

    content.markdown = unescape(content.markdown)

    return {
      path,
      exact: true,
      render: (): JSX.Element =>
        (<Renderable {...content} />),

    }
  })
}

const posts = parseNodeSpaceContent(global.$content.posts).map((post) => {
  post.frontmatter.path = `/blog/${post.frontmatter.path}`
  return post
})
const pages = parseNodeSpaceContent(global.$content.pages)

const postRoutes = routesFromNodeSpace(posts, Post)
const pageRoutes = routesFromNodeSpace(pages, Page)

const paginatedPosts: ContentProps[][] = []

for (
  let page = 0,
      max = Math.ceil(posts.length / postsPerPage);
  page < max;
  page += 1
) {
  const startingIndex = page * postsPerPage

  paginatedPosts[page] = posts.slice(startingIndex, startingIndex + postsPerPage)
}

const routes = [
  {
    path: `/blog/page/:page`,
    component: PostsList,
    paginated: true,
  },
  {
    path: "/blog",
    exact: true,
    component: PostsList,
  },
  ...(siteConfig.routes || []),
  ...postRoutes,
  ...pageRoutes,
]

export {
  pages,
  posts,
  paginatedPosts,
  routes,
}
export default routes
