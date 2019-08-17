import media from "styled-media-query"
import { Grid } from "./grid"

export const LatestPostsGrid = Grid("div")`
  ${media.lessThan("medium")`
    grid-template-columns: 1;
    grid-template-rows: auto;
  `}
`
