import React, { Fragment } from "react"

import "@less/default-theme.less"

interface Props {
  children?: JSX.Element[] | null,
}

function App(props: Props) {
  return (
    <Fragment>
      { props.children }
    </Fragment>
  )
}

export default App
