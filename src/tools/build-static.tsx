import BaseApp from "@components/base-app/base-app"
import Router from "@components/router"
import SiteNav from "@src/shared/components/nav/nav"
import {GlobalStyle} from "@src/shared/theme/global"
import {Main} from "@src/shared/theme/main"
import enGb from "@translations/en-gb"
import {mkdirSync, readFileSync, writeFileSync} from "fs"
import {dirname, resolve, basename} from "path"
import React, {Fragment} from "react"
import {renderToString} from "react-dom/server"
import {AppContainer} from "react-hot-loader"
import {IntlProvider} from "react-intl"
import {RouteProps, StaticRouter} from "react-router"
import {ServerStyleSheet} from "styled-components"
import {ContentProps} from "types/content"
import {pages, routes, posts} from "../routes"
import {siteConfig} from "@config"
import Helmet, {HelmetData} from "react-helmet"
import {minify} from "html-minifier"

export interface PaginatedRoute extends RouteProps {
  paginated?: boolean
}

export interface BuildStaticOptions {
  target: string
  baseUrl: string
}

export interface WritableContentObject {
  path: string
  body: string
  styles: string
  meta: HelmetData
}

/**
 * Get a list of unique content from all
 * the content available so we can render
 * each page.
 *
 * @param {ContentProps[]} posts to get tags for.
 * @return {string[]} array of unique content.
 */
export function collectUniqueMappedContent(content: ContentProps[], parameter: string): string[] {
  const tags: string[] = content.reduce((workingTags: string[], post: ContentProps): string[] => {
    if (post.frontmatter[parameter]) {
      return workingTags.concat(post.frontmatter[parameter])
    }

    return workingTags
  }, [])

  return Array.from(new Set(tags)) // De-dupe
}

/**
 * Separate the content based on whether the
 * path contains any parameters or not
 *
 * @param {RouteProps[]} routes to separate.
 * @returns {{separated: RouteProps[], normal: RouteProps[]}} categorised content.
 */
export function separateParameterisedRoutes(routes: PaginatedRoute[]): Record<string, PaginatedRoute[]> {
  const separatedContent: Record<string, PaginatedRoute[]> = {
    parameterised: [],
    normal: [],
    paginated: [],
  }

  routes.forEach((route: PaginatedRoute) => {
    route.path = (route.path as string).toLowerCase()
    if (route.paginated) {
      separatedContent.paginated.push(route)
    }
    else if (route.path && route.path.includes(":")) {
      separatedContent.parameterised.push(route)
    }
    else {
      separatedContent.normal.push(route)
    }
  })

  return separatedContent
}

/**
 * Write the WritableContentObject to a file as html
 *
 * @param {WritableContentObject} content to write to a file.
 */
export function writeContentToFile(content: WritableContentObject) {
  const htmlMarkup = readFileSync(resolve(process.cwd(), "./dist/index.html")).toString()
    .replace(/\<title\>.*\<\/title\>/gi, content.meta.title.toString())
    .replace("</title>", "</title>" + content.meta.meta)
    .replace("</head>", content.styles + "</head>")
    .replace("</head>", content.meta.link + "</head>")
    .replace(/.*\<script.*\>\<\/script\>.*/gi, content.body)
  const minifiedMarkup = minify(htmlMarkup, {
    removeTagWhitespace: true,
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    minifyCSS: true,
    minifyJS: true,
  })

  mkdirSync(dirname(content.path), {recursive: true})
  console.log("Writing %s", content.path)
  writeFileSync(content.path, minifiedMarkup)
}

export function getRenderableContent(config: BuildStaticOptions, route: RouteProps): WritableContentObject {
  const stylesheet = new ServerStyleSheet()

  const renderedApp = ({
    path: config.target + ((route.path as string).toLowerCase()) + "/index.html",
    body: renderToString(stylesheet.collectStyles((
      <AppContainer>
        <IntlProvider locale="en-gb" messages={enGb}>
          <StaticRouter location={route.path} context={{}}>
            <Fragment>
              <GlobalStyle />
              <SiteNav pages={pages} />
              <Main id="content">
                <Router routes={routes} />
                <BaseApp />
              </Main>
            </Fragment>
          </StaticRouter>
        </IntlProvider>
      </AppContainer>
    ))),
    styles: stylesheet.getStyleTags(),
    meta: Helmet.renderStatic()
  })

  stylesheet.seal()
  return renderedApp
}

export function getRenderableRSSContent(config: BuildStaticOptions, content: ContentProps[]): string {
  return `<?xml version="1.0"?>
<rss version= "2.0">
  <channel>
  ${
    content
    .filter((targetContent: ContentProps) => targetContent.frontmatter.status !== "draft" && targetContent.frontmatter.published !== "false")
    .map((targetContent: ContentProps) => {
      const title = targetContent.frontmatter.title
      const description = targetContent.frontmatter.excerpt
      return `<item>
          <title>${title}</title>
          <description>${description}</description>
          <link>${config.baseUrl}/blog/${basename(targetContent.contentPath.toLowerCase(), ".md")}/</link>
        </item>`
    })
      .join("\n")
  }
  </channel>
</rss>
`
}

export function getRenderableSiteMapContent(config: BuildStaticOptions, content: RouteProps[]): string {
  return `<?xml version="1.0"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${
    content
    .map((targetContent: RouteProps) => {
      const loc = ((targetContent.path as string).replace(config.target, config.baseUrl))
        .replace("/index.html", "")
      return `<url>
          <changefreq>weekly</changefreq>
          <loc>${loc}</loc>
        </url>`
    })
      .join("\n")
  }
</urlset>
`
}
export default function BuildStatic(config: BuildStaticOptions) {
  mkdirSync(config.target, {recursive: true})

  // Collect information on the content so we can
  // do the right work with the right data at the
  // right time.
  const separatedContent = separateParameterisedRoutes(routes)

  // Create the content for the normal content first.
  const writableContent = separatedContent.normal.map((route: RouteProps) => getRenderableContent(config, route))

  // Write these pages.
  writableContent.forEach(writeContentToFile)

  const parameterisedContent = Object.keys(siteConfig.parameterMap)
    .reduce((out: WritableContentObject[], currentParameter: string) => {
      const targetFrontmatter = siteConfig.parameterMap[currentParameter]
      const targetRoute = (siteConfig.routes || []).find((route: RouteProps) => (route.path || "").includes(currentParameter))
      const targetContent = collectUniqueMappedContent(posts, targetFrontmatter)

      if (!targetRoute)
        return out

      return out.concat(targetContent.map((value: string): WritableContentObject => {
        const modifiedRoute = {
          ...targetRoute,
          path: (targetRoute.path as string).replace(new RegExp(currentParameter), value),
        }
        return getRenderableContent(config, modifiedRoute)
      }))
    }, [])

  // Write these pages.
  parameterisedContent.forEach(writeContentToFile)

  // Write paginated lists.
  const perPage = siteConfig.postsPerPage || 10
  const pages = Math.ceil(posts.length / perPage)
  const writablePages: WritableContentObject[] = separatedContent.paginated.reduce((out: WritableContentObject[], route: PaginatedRoute): WritableContentObject[] => {
    for (let page = 0; page < pages; page += 1) {
      const modifiedRoute = {
        ...route,
        path: (route.path as string).replace(":page", page.toString())
      }

      out.push(getRenderableContent(config, modifiedRoute))
    }

    return out
  }, [])

  writablePages.forEach(writeContentToFile)

  if (siteConfig.rss) {
    const rssFeed = getRenderableRSSContent(config, posts)
    console.log("Writing: %s", config.target + "/rss.xml")
    writeFileSync(config.target + "/rss.xml", rssFeed)
  }

  const rssFeed = getRenderableSiteMapContent(config, [...writableContent, ...writablePages, ...parameterisedContent])
  console.log("Writing: %s", config.target + "/sitemap.xml")
  writeFileSync(config.target + "/sitemap.xml", rssFeed)
}

BuildStatic({
  target: resolve(process.cwd(), "./build"),
  baseUrl: "https://dav3.co",
})
