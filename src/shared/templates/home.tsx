import React, { Fragment } from "react"
import { ContentProps } from "types/content"
import { Helmet } from "react-helmet"
import LatestPosts from "@src/shared/components/post/latest"
import { posts } from "@src/routes"
import Markdown from "@components/md-parser/md-parser"
import Testimonials from "@src/shared/components/testimonials"
import { Permalink } from "@src/shared/components/markdown-renderers/header-N"
import { BookingButton } from "../components/booking-button"

export function HomePage(props: ContentProps): JSX.Element {
  return (
    <Fragment>
      <Helmet>
        <title>{props.frontmatter.title}</title>
        <meta name="description" content={props.frontmatter.description} />
        <meta
          name="keywords"
          content={(props.frontmatter.keywords || []).join(" ")}
        />

        <body className={props.frontmatter.bodyClasses} />
      </Helmet>

      <div className="hero-container">
        <div className="hero">
          <p>
            👋 I'm Dave Mackintosh, I do React, React Native, TypeScript,
            GraphQL
          </p>
          <BookingButton />
        </div>
        <div className="hero">
          <img src="/images/avi.png" alt="Cartoon of Dave Mackintosh" />
        </div>
      </div>

      <Markdown markdown={props.markdown} />
      <hr />
      <h3 id="latest-posts">
        <Permalink
          to={"#latest-posts"}
          title="Permalink to Dave Mackintosh's latest posts"
        >
          #
        </Permalink>
        Latest posts
      </h3>
      <LatestPosts numberOfPosts={2} posts={posts.slice(0, 2)} />

      <hr />
      <h3 id="testimonials">
        <Permalink
          to={"#testimonials"}
          title="Permalink to lovely words about Dave Mackintosh"
        >
          #
        </Permalink>
        Testimonials
      </h3>
      <Testimonials testimonials={props.frontmatter.testimonials} />
      <hr />
    </Fragment>
  )
}
