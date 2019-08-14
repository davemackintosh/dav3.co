import BaseApp from "@components/base-app/base-app"
import Router from "@components/router"
import SiteNav from "@src/shared/components/nav/nav"
import {GlobalStyle} from '@src/shared/theme/global';
import enGb from "@translations/en-gb"
import {mkdirSync, readFileSync, writeFileSync} from "fs"
import {dirname, resolve} from "path"
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
  mkdirSync(config.target, { recursive: true })

  const writableContent = routes.map((route: RouteProps): WritableContentObject => {
    const stylesheet = new ServerStyleSheet()

    const renderedApp = ({
      path: config.target + route.path + "/index.html",
      body: renderToString(stylesheet.collectStyles((
        <AppContainer>
          <IntlProvider locale="en-gb" messages={enGb}>
            <StaticRouter location={route.path} context={{}}>
              <Fragment>
                <GlobalStyle />
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

  writableContent.forEach((content: WritableContentObject) => {
    mkdirSync(dirname(content.path), { recursive: true })
    writeFileSync(content.path, htmlMarkup
      .replace("</head>", content.styles + "</head>")
      .replace(/.*\<script.*\>\<\/script\>.*/gi, content.body),
    )
  })
}

BuildStatic({
  target: resolve(process.cwd(), "./build"),
})
