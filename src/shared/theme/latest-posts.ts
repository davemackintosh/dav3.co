import {Grid} from "./grid"
import media from "styled-media-query"

export const LatestPostsGrid = Grid("div")`
  ${media.lessThan("medium")`
    grid-template-columns: 1;
    grid-template-rows: auto;
  `}
`
