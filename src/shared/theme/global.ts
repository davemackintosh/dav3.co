import media from "styled-media-query"
import theme from "@styled/theme"
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.font};
    font-family: ${theme.typography.primaryFontFamilies};
    font-size: 1.1em;
    line-height: 2em;

    @media print {
      background-color: white;
      color: ${theme.colors.background};
    }
  }

  * + * {
    box-sizing: border-box;
  }

  a {
    color: ${theme.colors.fontAttention};
  }

  img {
    max-width: 80%;
    margin: initial auto;
  }

  code {
    background: rgba(0, 0, 0, 0.35);
    border-radius: 5px;
    padding: 0 0.5em;
    display: inline-block;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 1.4em;
    line-height: 2em;
    letter-spacing: -1px;

    ${media.lessThan("medium")`
      & {
        line-height: 1.4em;
      }
      `}
  }

  ::selection {
    background: ${theme.colors.fontAttention};
  }

  .hero-container {
    max-width: 36em;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    margin: 5rem auto;
    background-color: #5A5E65;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVQImWNgYGD4z0AswK4SAFXuAf8EPy+xAAAAAElFTkSuQmCC);

    ${media.lessThan("medium")`
      width: 75%;
      margin-top: 0;
      max-width: initial;
      flex-direction: column-reverse;
      text-align: center;
      align-items: center;
      justify-content: center;
    `}
  }

  .hero {
    ${media.greaterThan("medium")`
      line-height: 2em;
      text-align: center;
    `}
  }

`
