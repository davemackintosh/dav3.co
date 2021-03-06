import styled from "styled-components"
import media from "styled-media-query"

export const Main = styled.main`
  width: 70vw;
  margin: 3rem auto;

  ${media.lessThan("medium")`
    width: 90vw;
  `}
`
