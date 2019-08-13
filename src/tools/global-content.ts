import { pages, posts } from "../node-space-content"

global.$content = {
  pages: `${JSON.stringify(pages).replace(/(?:\r\n|\r|\n)/g, "\\\\n")}`,
  posts: `${JSON.stringify(posts).replace(/(?:\r\n|\r|\n)/g, "\\\\n")}`,
}
