import React from "react"
import { Route, RouteProps, Switch } from "react-router"

interface Props {
  routes: RouteProps[],
}

function Router(props: Props) {
  return (
    <Switch>
      {
        props.routes.map((route: RouteProps) => <Route key={route.path} {...route} />)
      }
    </Switch>
  )
}

export default Router
