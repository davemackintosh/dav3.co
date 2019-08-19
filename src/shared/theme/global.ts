import theme from "@styled/theme"
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.font};
    font-family: ${theme.typography.primaryFontFamilies};
    font-size: 1.3em;
    line-height: 1.8em;
  }

  a {
    color: ${theme.colors.fontAttention};
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 2em;
  }
`
