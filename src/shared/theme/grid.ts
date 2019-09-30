/*eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any*/
import styled from "styled-components"

export interface GridProps {
  columns?: number | "auto"
  rows?: number | "auto"
  gutter?: string
}

type ElementNames = keyof JSX.IntrinsicElements

type BadPropsCallback = (
  props: GridProps,
  _f: any,
  _u: any,
  _c: any,
  _k: any,
) => string

const FuckOffBadTypes = (
  callback: (props: GridProps) => string,
): BadPropsCallback => (
  props: GridProps,
  _f: any,
  _u: any,
  _c: any,
  _k: any,
  // off
): string => callback(props)

export const Grid = (component: ElementNames = "div") => styled[component]`
  display: grid;
  grid-auto-columns: max-content;
  grid-template-columns: ${FuckOffBadTypes(props =>
    props.columns === "auto"
      ? "auto"
      : (100 / (props.columns || 2) + "%").repeat(props.columns || 2),
  )};
  grid-template-rows: ${FuckOffBadTypes(props =>
    props.rows === "auto" ? "auto" : "1fr ".repeat(props.rows || 3),
  )};
  grid-column-gap: ${FuckOffBadTypes(props => props.gutter || "1rem")};
  grid-row-gap: ${FuckOffBadTypes(props => props.gutter || "1rem")};
  align-items: center;
`

Grid.defaultProps = {
  columns: 2,
  rows: "auto",
  gutter: "1rem",
}

export const AutoGrid = (component: ElementNames = "div") => styled[component]`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`
