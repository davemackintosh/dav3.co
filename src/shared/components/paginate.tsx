import React from "react"
import { NavLink } from "@src/shared/theme/nav"
import { Grid } from "@src/shared/theme/grid"
import styled from "styled-components"

interface Props {
  perPage: number
  totalItems: number
  route: string
}

function Paginate(props: Props): JSX.Element {
  const numberOfPages = Math.ceil(props.totalItems / props.perPage)
  const GridContainer = styled(Grid("div"))``
  return (
    <GridContainer>
      {Array.from(Array(numberOfPages)).map((_nope, index: number) => (
        <NavLink to={props.route + "/page/" + (index + 1)} key={props.route}>
          {index + 1}
        </NavLink>
      ))}
    </GridContainer>
  )
}

export default Paginate
