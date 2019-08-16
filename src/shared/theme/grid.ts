import styled from "styled-components"

export interface GridProps {
  columns?: number | "auto"
  rows?: number | "auto"
  gutter?: string
}

export const Grid = (component: keyof JSX.IntrinsicElements = "div") => styled[
  component
]`
  display: grid;
  grid-template-columns: ${(props: GridProps) =>
    props.columns === "auto" ? "auto" : "1fr ".repeat(props.columns || 2)};
  grid-template-rows: ${(props: GridProps) =>
    props.rows === "auto" ? "auto" : "1fr ".repeat(props.rows || 3)};
  grid-column-gap: ${(props: GridProps) => props.gutter || "1rem"};
  grid-row-gap: ${(props: GridProps) => props.gutter || "1rem"};
`
