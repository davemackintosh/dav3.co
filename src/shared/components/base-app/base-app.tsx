import React, { Fragment } from "react"

interface Props {
  children?: JSX.Element[] | null
}

function App(props: Props): JSX.Element {
  return <Fragment>{props.children}</Fragment>
}

export default App
