import { RouteProps } from "react-router"

type TemplateComponent = (props: any) => JSX.Element

export interface Config {
  parameterMap: Record<string, string>
  routes?: RouteProps[]
  rss?: boolean
  postsPerPage?: number
  templates?: Record<string, TemplateComponent>
}
