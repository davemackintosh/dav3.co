import styled from "styled-components"

export interface GridProps {
  columns?: number | "auto"
  rows?: number | "auto"
  gutter?: string
}

type ElementNames = keyof JSX.IntrinsicElements

export const Grid = (component: ElementNames = "div"): string => styled[
  component as ElementNames
]`
  display: grid;
  grid-template-columns: ${(props: GridProps): string =>
    props.columns === "auto" ? "auto" : "1fr ".repeat(props.columns || 2)};
  grid-template-rows: ${(props: GridProps): string =>
    props.rows === "auto" ? "auto" : "1fr ".repeat(props.rows || 3)};
  grid-column-gap: ${(props: GridProps): string => props.gutter || "1rem"};
  grid-row-gap: ${(props: GridProps): string => props.gutter || "1rem"};
`
