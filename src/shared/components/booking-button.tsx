import React from "react"
import styled from "styled-components"

const Tiny = styled.small`
  font-size: 0.7em;
  display: block;
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
      Are you looking for a developer?{" "}
      <a
        href="https://calendly.com/davemackintosh/15min"
        rel="noopener noreferrer nofollow"
        target="_blank"
      >
        <Tiny>I&apos;m looking for a new contract 💖 HMU</Tiny>
      </a>
    </HiringBar>
  )
}
