import media from "styled-media-query"
import styled from "styled-components"
import { Grid } from "./grid"

export const LatestPostsGrid = styled(Grid("div"))`
  align-items: baseline;
  ${media.lessThan("medium")`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-auto-rows: min-content;
  `}
`
