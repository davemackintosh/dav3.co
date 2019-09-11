import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const Tiny = styled.small`
  font-size: 0.7em;
  display: block;
`

const takingBookings = false

export function BookingButton(): JSX.Element {
  if (takingBookings) {
    return (
      <NavLink
        to="mailto:its+booking@dav3.co"
        title="Schedule a chat with Dave Mackintosh"
      >
        Looking for a JavaScript developer?
      </NavLink>
    )
  } else {
    return (
      <Fragment>
        Not currently booking
        <NavLink
          to="mailto:its+booking@dav3.co"
          title="Talk to Dave Mackintosh"
        >
          <Tiny>If you still want to talk 💖 HMU</Tiny>
        </NavLink>
      </Fragment>
    )
  }
}
