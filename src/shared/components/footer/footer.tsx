import React from "react"
import styled from "styled-components"
import { GoMarkGithub } from "react-icons/go"
import { IoLogoTwitter } from "react-icons/io"
import theme from "@src/shared/theme/theme"
import { Grid } from "@src/shared/theme/grid"

const Small = styled.small`
  color: ${theme.colors.fontUnimportant};
  display: block;
`

const StyledFooter = styled.footer`
  width: 80vw;
  margin: 2em auto;
`

const LinkGrid = styled(Grid("div"))``
const Icon = styled.div`
  display: inline-block;
  margin-right: 1em;
  vertical-align: sub;
`

function Footer(): JSX.Element {
  return (
    <StyledFooter>
      <Small>Everything on this website is MIT lisensed.</Small>
      <Small>It was written by Dave Mackintosh.</Small>
      <hr />
      <LinkGrid>
        <Small>
          <a
            href="https://twitter.com/daveymackintosh"
            rel="noopen no-referrer"
            title="Dave Mackintosh's Twitter profile"
          >
            <Icon>
              <IoLogoTwitter />
            </Icon>
            Twitter
          </a>
        </Small>
        <Small>
          <a
            href="https://github.com/davemackintosh"
            rel="noopen no-referrer"
            title="Dave Mackintosh's Github profile"
          >
            <Icon>
              <GoMarkGithub />
            </Icon>
            Github
          </a>
        </Small>
      </LinkGrid>
    </StyledFooter>
  )
}

export default Footer
