import TagPostList from "@components/tags/list"
import { Config } from "types/config"
import { HomePage } from "@src/shared/templates/home"
import WorkHistory from "@src/shared/templates/work-history"

export const siteConfig: Config = {
  postsPerPage: 10,

  /**
   * Add custom config here, this can be anything
   * you want it to be
   */
  custom: {},

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
      // Here we see our parameterMap being used.
      // this will loop over all posts and keywords and generate
      // content for each keyword it finds.
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

  /**
   * Define custom templates here, these are used by
   * posts and pages that specify a template prop in
   * their frontmatter config.
   */
  templates: {
    home: HomePage,
    "work-history": WorkHistory,
  },
}

export default siteConfig
