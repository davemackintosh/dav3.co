import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import { IntlProvider } from "react-intl"
import { BrowserRouter } from "react-router-dom"

import BaseApp from "@components/base-app/base-app"
import Footer from "@components/footer/footer"
import SiteNav from "@components/nav/nav"
import Router from "@components/router"
import { pages } from "@src/routes"
import routes from "@src/routes"
import {Main} from "@src/shared/theme/main"
import {GlobalStyle} from "@styled/global"
import enGB from "@translations/en-gb"

const rootNode = document.getElementById("dav3-container")

const app = (
  <AppContainer>
    <IntlProvider locale="en-gb" messages={ enGB }>
      <BrowserRouter>
        <Fragment>
          <GlobalStyle />
          <SiteNav pages={ pages } />
          <Main id="content">
            <Router routes={ routes } />
            <BaseApp />
          </Main>
          <Footer />
        </Fragment>
      </BrowserRouter>
    </IntlProvider>
  </AppContainer>
)

ReactDOM.render(app, rootNode)

if ((module as any).hot) {
  ((module as any).hot as any).accept()
}
