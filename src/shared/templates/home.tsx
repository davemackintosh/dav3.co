import React, {Fragment} from "react"
import {ContentProps} from "types/content"
import Helmet from "react-helmet"
import LatestPosts from "@src/shared/components/post/latest"
import {siteConfig} from '@config';
import {posts} from '@src/routes';
import Markdown from "@components/md-parser/md-parser"
import Testimonials from "@src/shared/components/testimonials"
import {Permalink} from '@src/shared/components/markdown-renderers/header-N';

export function HomePage(props: ContentProps) {
  return (
    <Fragment>
      <Helmet>
        <title>{ props.frontmatter.title }</title>
        <meta name="description" content={props.frontmatter.description} />
        <meta name="keywords" content={(props.frontmatter.keywords || []).join(" ")} />

        <body className={ props.frontmatter.bodyClasses } />
      </Helmet>

      <Markdown markdown={props.markdown} />
      <hr />
      <Testimonials testimonials={props.frontmatter.testimonials} />
      <hr />
      <h3 id="latest-posts">
        <Permalink
          to={"#latest-posts"}
          title="Permalink to latest posts on home page">
          #
        </Permalink>
        Latest posts
      </h3>
      <LatestPosts numberOfPosts={siteConfig.postsPerPage || 8} posts={posts.slice(0, siteConfig.postsPerPage || 8)} />
    </Fragment>
  )
}
