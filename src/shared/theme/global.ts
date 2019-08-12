import theme from "@styled/theme"
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.font};
    font-family: ${theme.typography.primaryFontFamilies};
  }

  a {
    color: ${theme.colors.fontAttention};
  }
`
