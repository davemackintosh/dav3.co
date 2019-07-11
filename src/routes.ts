import Page from "@components/page/page"
import PostsList from "@components/post/list"
import Post from "@components/post/post"
import TagPostList from "@components/tags/list"
import {RouteProps} from "react-router"
import {
  ContentProps,
} from "../types/content"

const parseNodeSpaceContent = (content: string): ContentProps[] =>
  JSON.parse(content)

const routesFromNodeSpace = (contents: ContentProps[], component: JSX.Element): RouteProps[] => {
  const Renderable = component as JSX.Element

  return contents.map((content: ContentProps) => {
    const path = content.frontmatter.path
      ? content.frontmatter.path
      : "/" + content.contentPath.substr(0, content.contentPath.lastIndexOf("."))

    return {
      path,
      exact: true,
      render: (): JSX.Element => {...content} as Renderable / > ,
    }
  })
}

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
