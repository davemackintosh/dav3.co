import styled from "styled-components"
import media from "styled-media-query"

export const Main = styled.main`
  width: 80vw;
  margin: 1rem auto;

  ${media.lessThan("medium")`
    width: 90vw;
  `}
`
