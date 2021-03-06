import Markdown from "@components/md-parser/md-parser"
import React, { Fragment } from "react"
import { Helmet } from "react-helmet"
import { ContentProps } from "../../../../types/content"
import { siteConfig } from "@config"

export default function Page(props: ContentProps): JSX.Element {
  if (
    props.frontmatter.template &&
    siteConfig.templates &&
    siteConfig.templates[props.frontmatter.template]
  ) {
    const Component = siteConfig.templates[props.frontmatter.template]
    return <Component {...props} />
  }

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

      <Markdown markdown={props.markdown} />
    </Fragment>
  )
}
