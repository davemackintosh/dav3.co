import React, {Fragment} from "react"
import {PrimaryLink} from "@styled/links"
import styled from "styled-components"
import theme from '@src/shared/theme/theme';

const Tiny = styled.small`
  font-size: 0.7em;
  display: block;
`

const CTABooking = styled(PrimaryLink)`
  border-radius: 3px;
  text-align: center;
  background-color: ${theme.colors.fontAttention};
  color: #FFF;
`

const takingBookings = false

export function BookingButton() {
  if (takingBookings) {
    return (
      <CTABooking
        to="mailto:its+booking@dav3.co"
        title="Schedule a chat with Dave Mackintosh"
      >
        Looking for a JavaScript developer?
      </CTABooking>
    )
  }
  else {
    return (
      <Fragment>
        Not currently booking
        <PrimaryLink
          to="mailto:its+booking@dav3.co"
          title="Talk to Dave Mackintosh"
        >
          <Tiny>If you still want to talk 💖 HMU</Tiny>
        </PrimaryLink>
      </Fragment>
    )
  }
}
