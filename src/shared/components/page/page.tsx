import Markdown from "@components/md-parser/md-parser"
import React, {Fragment} from "react"
import Helmet from "react-helmet"
import {ContentProps} from "../../../../types/content"
import LatestPosts from "@components/post/latest"
import {posts} from "@src/routes"
import {siteConfig} from "@config"

export default function Page(props: ContentProps): JSX.Element {
  const latestPosts = props.frontmatter.path === "/"
    ? <LatestPosts numberOfPosts={siteConfig.postsPerPage || 8} posts={posts.slice(0, siteConfig.postsPerPage || 8)} />
    : null

  return (
    <Fragment>
      <Helmet>
        <title>{ props.frontmatter.title }</title>
        <meta name="description" content={props.frontmatter.description} />
        <meta name="keywords" content={(props.frontmatter.keywords || []).join(" ")} />

        <body className={ props.frontmatter.bodyClasses } />
      </Helmet>

      <Markdown markdown={ props.markdown } />
      <hr />
      {latestPosts}
    </Fragment>
  )
}

