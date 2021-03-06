import { NavLink as RRNavLink } from "react-router-dom"
import styled from "styled-components"
import media from "styled-media-query"

export const Nav = styled.nav`
  width: 80vw;
  margin: 1rem auto;

  ${media.lessThan("medium")`
    width: 90vw;
  `}

  @media print {
    display: none;
  }
`

export const NavUl = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NavLi = styled.li`
  list-style: none;
  padding: 1em 2em;
`

export const SkipToContentNavLink = styled.a`
  position: absolute;
  left: -999rem;
  width: 0;
  height: 0;

  :focus {
    position: initial;
  }
`

export const NavLink = styled(RRNavLink)`
  font-weight: 700;
`
