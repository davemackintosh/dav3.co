import styled from "styled-components"

export interface GridProps {
  columns?: number
  rows?: number
  gutter?: string
}

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props: GridProps) => "1fr".repeat(props.columns || 2)};
  grid-template-rows: ${(props: GridProps) => "1fr".repeat(props.rows || 3)};
  grid-column-gap: ${(props: GridProps) => props.gutter || "1rem"};
  grid-row-gap: ${(props: GridProps) => props.gutter || "1rem"};
`
