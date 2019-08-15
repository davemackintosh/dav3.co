import { RouteProps } from "react-router"

export interface Config {
  parameterMap: Record<string, string>
  routes?: RouteProps[]
  rss?: boolean
  postsPerPage?: number
}
