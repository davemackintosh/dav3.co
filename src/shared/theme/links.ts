import theme from "@src/shared/theme/theme"
import styled from "styled-components"
import {NavLink} from 'react-router-dom';

export const PrimaryLink = styled(NavLink)`
  color: ${theme.colors.fontAttention};
`

export const SecondaryLink = styled(NavLink)`
  color: ${theme.colors.fontCta};
`
