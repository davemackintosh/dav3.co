import Page from "@components/page/page"
import PostsList from "@components/post/list"
import Post from "@components/post/post"
import TagPostList from "@components/tags/list"
import React from "react"
import {RouteProps} from "react-router"
import {
  ContentProps,
} from "../types/content"

type ComponentType = typeof Post | typeof Page

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

    return {
      path,
      exact: true,
      render: (): JSX.Element => {
        return <Renderable {...content} />
      },
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

const routes = [
  {
    path: "/blog",
    exact: true,
    component: PostsList,
  },
  {
    path: "/tag/:tag",
    exact: true,
    component: TagPostList,
  },
  ...postRoutes,
  ...pageRoutes,
]

export {
  pages,
  posts,
  routes,
}
export default routes
