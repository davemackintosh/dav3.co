import React from "react"
import styled from "styled-components"

const Tiny = styled.small`
  font-size: 0.7em;
  display: block;
`

const HiringBar = styled.div`
  text-align: right;
`

export function BookingButton(): JSX.Element {
  return (
    <HiringBar>
      Are you looking for a developer?
      <a
        href="https://calendly.com/davemackintosh/15min"
        title="Talk to Dave Mackintosh"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Tiny>I&apos;m looking for a permenant job 💖 HMU</Tiny>
      </a>
    </HiringBar>
  )
}
