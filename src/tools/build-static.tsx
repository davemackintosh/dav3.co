import React, {Fragment} from "react"
import { renderToString } from "react-dom/server"

import BaseApp from "@components/base-app/base-app"
import Router from "@components/router"
import SiteNav from "@src/shared/components/nav/nav"
import enGb from "@translations/en-gb"
import {AppContainer} from "react-hot-loader"
import {IntlProvider} from "react-intl"
import {RouteProps, StaticRouter} from "react-router"
import {pages, posts, routes} from "../routes"

global.$content.pages = `'${JSON.stringify(pages).replace(
  /(?:\r\n|\r|\n)/g,
  "\\\\n",
)}'`
global.$content.posts = `'${JSON.stringify(posts).replace(
  /(?:\r\n|\r|\n)/g,
  "\\\\n",
)}'`

export interface BuildStaticOptions {
  target: string
}

export interface WritableContentObject {
  path: string
  body: string
}

export default function BuildStatic(config: BuildStaticOptions) {
  const writableContent = routes.map((route: RouteProps) => ({
    path: config.target + route.path + "/index.html",
    body: renderToString((
      <AppContainer>
        <IntlProvider locale="en-gb" messages={enGb}>
          <StaticRouter location={route.path} context={{}}>
            <Fragment>
              <SiteNav pages={pages} />
              <main id="content">
                <Router routes={routes} />
                <BaseApp />
              </main>
            </Fragment>
          </StaticRouter>
        </IntlProvider>
      </AppContainer>
    )),
  }))

  console.log(writableContent)
}
