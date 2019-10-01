import styled from "styled-components"

export interface GridProps {
  columns?: number | "auto"
  rows?: number | "auto"
  gutter?: string
}

type ElementNames = keyof JSX.IntrinsicElements

//@TODO: Make this as it was, a simple accessor key on styled...
export const Grid = (component: ElementNames = "div") => {
  let styledComp = styled.div

  switch (component) {
    case "ul":
      styledComp = styled.ul
      break
    case "div":
    default:
      styledComp = styled.div
  }

  return styledComp<GridProps>`
    display: grid;
    grid-auto-columns: max-content;
    grid-template-columns: ${props =>
      props.columns === "auto"
        ? "auto"
        : (100 / (props.columns || 2) + "%").repeat(props.columns || 2)};
    grid-template-rows: ${props =>
      props.rows === "auto" ? "auto" : "1fr ".repeat(props.rows || 3)};
    grid-column-gap: ${props => props.gutter || "1rem"};
    grid-row-gap: ${props => props.gutter || "1rem"};
    align-items: center;
  `
}

Grid.defaultProps = {
  columns: 2,
  rows: "auto",
  gutter: "1rem",
}

export const AutoGrid = (component: ElementNames = "div") => styled(component)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`
