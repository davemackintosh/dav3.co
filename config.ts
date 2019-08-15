import TagPostList from "@components/tags/list"
import { Config } from "types/config"

export const siteConfig: Config = {
  /**
   * When the static builder finds parameterised
   * routes, it will render them according to
   * this map. So when a route path contains
   * ":tag" it will use this map to look up
   * which frontmatter attribute to render with.
   *
   * There is no type guarding available for
   * this map or the mapped content so you need
   * to be sure that the content in the frontmatter
   * needs to be the same as what is expected of the parameter.
   *
   * Each key here also needs to be present in a route
   * or nothing will happen.
   *
   * @example
   * ```javascript
   * {
   *   parameterMap: {
   *     ":tag": "keywords"
   *   }
   * }
   * ```
   */
  parameterMap: {
    ":tag": "keywords",
  },

  /**
   * Extra routes to render. Are just
   * react router 4 routes.
   */
  routes: [
    {
      path: "/tag/:tag",
      exact: true,
      component: TagPostList,
    },
  ],

  /**
   * Generate an RSS feed. Will create a static
   * XML file containing each post sorted by date.
   */
  rss: true,

  postsPerPage: 1,
}
