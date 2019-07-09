import PostsList from "@components/post/list"
import TagPostList from "@components/tags/list"
import Page from "@components/page/page"
import Post from "@components/post/post"
import {
  ContentProps,
  $content,
} from "../types/content"
import {Component} from "react"

const parseNodeSpaceContent = (content: string): ContentProps[] =>
  JSON.parse(content)

const routesFromNodeSpace = (contents: ContentProps[], Renderable: Component) =>
  contents.map((content: ContentProps) => ({
    path: content.frontmatter.path
      ? content.frontmatter.path
      : "/" + content.contentPath.substr(0, content.contentPath.lastIndexOf(".")),
    exact: true,
    render: () => ({...content} as Renderable / > ),
  }))

const posts = parseNodeSpaceContent($content.posts).map((post) => {
  post.frontmatter.path = `/blog/${post.frontmatter.path}`
  return post
})
const pages = parseNodeSpaceContent($content.pages)

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
}
export default routes
