// @flow

import React, { Fragment } from "react"

import type { Node } from "react"

import "@less/default-theme.less"

type Props = {
  name: string,
  children: ?Node[],
}

function Dav3App(props: Props) {
  return (
    <Fragment>
      { props.children }
    </Fragment>
  )
}

export default Dav3App
