import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import { IntlProvider } from "react-intl"
import { BrowserRouter } from "react-router-dom"

import SiteNav from "@components/nav/nav"
import { pages } from "@src/routes"
import Router from "@components/router"
import Footer from "@components/footer/footer"
import BaseApp from "@components/base-app/base-app"
import enGB from "@translations/en-gb"
import routes from "@src/routes"

const rootNode = document.getElementById("dav3-container")

const app = (
  <AppContainer>
    <IntlProvider locale="en-gb" messages={ enGB }>
      <BrowserRouter>
        <Fragment>
          <SiteNav pages={ pages } />
          <main id="content">
            <Router routes={ routes } />
            <BaseApp />
          </main>
          <Footer />
        </Fragment>
      </BrowserRouter>
    </IntlProvider>
  </AppContainer>
)

ReactDOM.render(app, rootNode)

if (module.hot)
  module.hot.accept()
