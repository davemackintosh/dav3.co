import styled from "styled-components"

export interface GridProps {
  columns?: number | "auto"
  rows?: number | "auto"
  gutter?: string
}

type ElementNames = keyof JSX.IntrinsicElements

export const Grid = (component: ElementNames = "div") => styled(component)`
  display: grid;
  grid-auto-columns: max-content;
  grid-template-columns: ${(props: GridProps): string =>
    props.columns === "auto"
      ? "auto"
      : (100 / (props.columns || 2) + "%").repeat(props.columns || 2)};
  grid-template-rows: ${(props: GridProps): string =>
    props.rows === "auto" ? "auto" : "1fr ".repeat(props.rows || 3)};
  grid-column-gap: ${(props: GridProps): string => props.gutter || "1rem"};
  grid-row-gap: ${(props: GridProps): string => props.gutter || "1rem"};
`

Grid.defaultProps = {
  columns: 2,
  rows: "auto",
  gutter: "1rem",
}

export const AutoGrid = (component: ElementNames = "div") => styled(component)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`
