import { pages, posts } from "../node-space-content"

global.$content = {
  pages: JSON.stringify(pages),
  posts: JSON.stringify(posts),
}
