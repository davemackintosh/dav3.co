import React from "react"
import styled from "styled-components"
import theme from "../theme/theme"
import media from "styled-media-query"

const Tiny = styled.span`
  padding: 1em;
  background-color: ${theme.colors.fontAttention};
  color: #ffffff;
  border-radius: 6px;
  margin-top: 1em;

  ${media.lessThan("medium")`
  display: block;
  text-align: center;
  `}
`

const HiringBar = styled.div`
  text-align: right;

  @media print {
    display: none;
  }
`

export function BookingButton(): JSX.Element {
  return (
    <HiringBar>
      <a
        href="https://calendly.com/davemackintosh/chat"
        rel="noopener noreferrer nofollow"
        target="_blank"
      >
        <Tiny>Let's talk about your project together 💖</Tiny>
      </a>
    </HiringBar>
  )
}
