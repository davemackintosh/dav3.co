import BaseApp from "@components/base-app/base-app"
import Router from "@components/router"
import SiteNav from "@src/shared/components/nav/nav"
import enGb from "@translations/en-gb"
import {readFileSync} from "fs"
import {resolve} from "path"
import React, {Fragment} from "react"
import { renderToString } from "react-dom/server"
import {AppContainer} from "react-hot-loader"
import {IntlProvider} from "react-intl"
import {RouteProps, StaticRouter} from "react-router"
import {ServerStyleSheet} from "styled-components"
import {pages, routes} from "../routes"

export interface BuildStaticOptions {
  target: string
}

export interface WritableContentObject {
  path: string
  body: string
  styles: string
}

export default function BuildStatic(config: BuildStaticOptions) {
  const writableContent = routes.map((route: RouteProps): WritableContentObject => {
    const stylesheet = new ServerStyleSheet()

    const renderedApp = ({
      path: config.target + route.path + "/index.html",
      body: renderToString(stylesheet.collectStyles((
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
      ))),
      styles: stylesheet.getStyleTags(),
    })

    stylesheet.seal()
    return renderedApp
  })

  const htmlMarkup = readFileSync(resolve(process.cwd(), "./dist/index.html")).toString()

  console.log(
    htmlMarkup
      .replace("</head>", writableContent[0].styles + "</head>")
      .replace("</body>", writableContent[0].body + "</body>"),
  )
}

BuildStatic({
  target: resolve(process.cwd(), "./build"),
})
