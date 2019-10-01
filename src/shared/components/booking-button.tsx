import React, { Fragment } from "react"
import styled from "styled-components"

const Tiny = styled.small`
  font-size: 0.7em;
  display: block;
`

export function BookingButton(): JSX.Element {
  return (
    <Fragment>
      Are you looking for a developer?
      <a href="mailto:its+jobhunting@dav3.co" title="Talk to Dave Mackintosh">
        <Tiny>I&apos;m looking for a job 💖 HMU</Tiny>
      </a>
    </Fragment>
  )
}
